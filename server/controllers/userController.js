const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const passport = require('passport');
const sendEmail = require('../utils/sendEmail');
const generateToken = require('../utils/generateToken');
const crypto = require('crypto');


exports.register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    if (!user.isEnable) {
      await User.deleteOne(user._id);
    } else {
      return next(new ErrorHandler("User already exists. Please login.", 400));
    }
  }

  const { token, hash, expiration } = generateToken();

  user = new User({ name: name, email: email, password: password, isEnable: false, loginMethods: ['password'], tokenHash: hash, tokenExpiration: expiration });
  await user.save();

  const url = `${process.env.CLIENT_DOMAIN}/verify-email?token=${token}`;
  await sendEmail({ name: user.name, email: user.email, subject: "Verify Email", url });

  res.status(200).json({ success: true, message: "Please check your email to verify." });
});

exports.verifyCallback = catchAsyncErrors(async (req, res, next) => {

  const token = req.query.token;

  if (!token) {
    return next(new ErrorHandler("Token is missing", 400));
  }

  const hash = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({ tokenHash: hash }).select("+tokenHash +tokenExpiration");

  if (!user) {
    return next(new ErrorHandler("Invalid token", 400));
  }

  if (Date.now() > user.tokenExpiration) {
    return next(new ErrorHandler("Token has expired. Please Register again.", 400));
  }

  user.isEnable = true;
  user.tokenHash = undefined;
  user.tokenExpiration = undefined;

  await user.save();

  return res.status(200).json({ success: true, message: "Email verified" });
});


exports.get = catchAsyncErrors(async (req, res, next) => {

  const user = await User.findById(req.user.id);
  res.status(200).json({success: true, user});

});

exports.getAll = catchAsyncErrors(async (req, res, next) => {

  const users = await User.find();
  res.status(200).json({success: true, users});

});

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {

  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);

});

exports.oauth = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.oauthCallback = catchAsyncErrors(async (req, res, next) => {
  passport.authenticate('google', (err, user, info) => {
    if (err) {
        return res.status(500).json({ message: 'Authentication error', error: err });
    }
    if (!user) {
        return res.status(401).json({ message: 'Authentication failed', info });
    }

    const token = user.getJWTToken();
  
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'PRODUCTION',
        sameSite: 'strict',
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000)
    })
    res.redirect(`${process.env.CLIENT_DOMAIN}/profile`);
  })(req, res, next);
});

exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email", 401));
  }

  if (!user.isEnable) {
    return next(new ErrorHandler("User is not verified yet. Please check your email and verify", 401));
  }

  if (!user.loginMethods.includes('password')) {
    return next(new ErrorHandler("You have signed up with Google. Either login with google or reset your password", 403));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid password", 401));
  }

  sendToken(user, 200, res);
});

exports.checkUser = catchAsyncErrors(async (req, res, next) => {
  res.json({ success: true, isLoggedIn: true });
});

exports.logout = catchAsyncErrors(async (req, res, next) => {

  res.clearCookie('token');
  res.status(200).json({success: true, message: "Logged Out"});

});