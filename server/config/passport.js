const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');
const sendNotification = require('../utils/sendNotification');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ "oauth.id": profile.id }).select("+oauth");
        if (!user) {
            user = await User.findOne({ email: profile.emails[0].value });
            if (!user) {
                user = await User.create({
                    "oauth.provider": 'google',
                    "oauth.id": profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    username: `${Math.floor(Math.random() * 100000)}`,
                    isEnable: true,
                    loginMethods: ['oauth']
                });
                await sendNotification(`Welcome to Hexis`,`Dear ${user.name.split(" ")[0]}, thank you for joining us. Start verifying your products now.`, user._id);
            } else {
                user.oauth = {provider: 'google', id: profile.id},
                user.isEnable = true,
                user.loginMethods.push('oauth')
                await user.save()
            }
        }
        user = await User.findById(user._id);
        done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
