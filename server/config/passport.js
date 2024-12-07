const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ oauthId: profile.id });
        if (!user) {
            user = await User.findOne({ email: profile.emails[0].value });
            if (!user) {
                user = await User.create({
                    oauthProvider: 'google',
                    oauthId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    isEnable: true,
                    loginMethods: ['oauth']
                });
            } else {
                user.oauthProvider = 'google',
                user.oauthId = profile.id,
                user.isEnable = true,
                user.loginMethods.push('oauth')
                user.save()
            }
        }
        user = await User.findById(user._id)
        done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
