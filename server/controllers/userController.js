const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const setToken = require("../utils/jwtToken");
const passport = require('passport');
const sendEmail = require('../utils/sendEmail');
const generateToken = require('../utils/generateToken');
const crypto = require('crypto');
const cloudinary = require("cloudinary");


exports.register = catchAsyncErrors(async (req, res, next) => {

  const userInfo = req.body;
  let user = await User.findOne({ email: userInfo.email });

  if (user) {
    if (!user.isEnable) {
      await User.deleteOne(user._id);
    } else {
      return next(new ErrorHandler("User already exists. Please login.", 400));
    }
  }

  userInfo.username = `${Math.floor(Math.random() * 100000)}`;
  const { token, hash, expiration } = generateToken();
  userInfo.token = {hash, expiration};
  user = new User(userInfo);
  await user.save();

  const url = `${req.protocol}://${req.get("host")}/api/user/verify-email?token=${token}`;
  await sendEmail({ name: user.name, email: user.email, subject: "Verify Email", url, message: "Thank you for signing up! Please click the button below to verify your email address and activate your account." });

  res.status(200).json({ success: true, message: "Please check your email to verify." });
});

exports.verifyCallback = catchAsyncErrors(async (req, res, next) => {

  const token = req.query.token;

  if (!token) {
    return next(new ErrorHandler("Token is missing", 400));
  }

  const hash = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({ "token.hash": hash }).select("+token");

  if (!user) {
    return next(new ErrorHandler("Invalid token", 400));
  }

  if (Date.now() > user.token.expiration) {
    return next(new ErrorHandler("Token has expired. Please Register again.", 400));
  }

  user.isEnable = true;
  user.token.hash = undefined;
  user.token.expiration = undefined;

  await user.save();

  setToken(user, res);
  res.redirect(`${process.env.CLIENT_DOMAIN}`);
});


exports.get = catchAsyncErrors(async (req, res, next) => {

  const user = await User.findById(req.user.id);
  res.status(200).json({success: true, user});

});

exports.getAll = catchAsyncErrors(async (req, res, next) => {

  const users = await User.find().sort({ createdAt: -1 });
  res.status(200).json({success: true, users});

});

exports.updateStatus = catchAsyncErrors(async (req, res, next) =>{
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  res.status(200).json({success: true, message: "Status Updated"});
});

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {

  const user = await User.findById(req.user.id).select("+password");

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  if (user.loginMethods.includes("password")) {
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect", 400));
    }
  }

  user.password = req.body.newPassword;
  await user.save();

  setToken(user, res);
  res.status(200).json({success: true, user, message: 'Password Updated'});

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

    if (!user.isEnable) {
      return next(new ErrorHandler("Account Disabled. Please contact support.", 401));
    }

    setToken(user, res);

    res.redirect(`${process.env.CLIENT_DOMAIN}`);
  })(req, res, next);
});

exports.login = catchAsyncErrors(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new ErrorHandler("Please Enter Username & Password", 400));
  }

  let user = await User.findOne({ email: username }).select("+password");

  if (!user) {
    user = await User.findOne({username}).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid credentials", 401));
    }
  }

  if (!user.isEnable && !user.token) {
    return next(new ErrorHandler("Account Disabled. Please contact support.", 401));
  } else if (!user.isEnable) {
    return next(new ErrorHandler("Please check your email to verify", 401));
  }

  if (!user.loginMethods.includes('password')) {
    return next(new ErrorHandler("You have signed up with Google. Either login with google or reset your password", 403));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid password", 401));
  }

  setToken(user, res);
  res.status(200).json({success: true, user, message: 'User authenticated.'});
});

exports.checkUser = catchAsyncErrors(async (req, res, next) => {
  res.json({ success: true, user: req.user });
});

exports.forgotPassword = catchAsyncErrors(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const { token, hash, expiration } = generateToken();
  user.token = {hash,expiration};
  await user.save();

  const url = `${process.env.CLIENT_DOMAIN}/reset-password?token=${token}`;
  await sendEmail({ name: user.name, email: user.email, subject: "Reset Password", url, message: "Please click the button below to verify your email address and reset your password." });

  res.status(200).json({ success: true, message: "Please check your email to reset password." });
});

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

  const token = req.query.token;
  const password = req.body.password;

  if (!token) {
    return next(new ErrorHandler("Token is missing", 400));
  }

  const hash = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({ "token.hash": hash }).select("+token");

  if (!user) {
    return next(new ErrorHandler("Invalid token", 400));
  }

  if (Date.now() > user.token.expiration) {
    return next(new ErrorHandler("Token has expired. Please reset password again.", 400));
  }

  user.password = password;
  user.isEnable = true;
  if (!user.loginMethods.includes("password")){
    user.loginMethods.push("password");
  }
  user.token.hash = undefined;
  user.token.expiration = undefined;

  await user.save();

  setToken(user, res);
  res.status(200).json({success: true, user, message: 'Password Reset Successful.'});
});

exports.logout = catchAsyncErrors(async (req, res, next) => {

  res.clearCookie('token');
  res.status(200).json({success: true, message: "Logged Out"});

});

exports.getAvatar = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  if (user.avatar && user.avatar.url) {
    res.status(200).json({success: true, avatar: user.avatar});
  } else {
    res.status(200).json({success: false, message: "Avatar Not Found"});
  }

});

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  
  const newUserData = req.body;

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({success: true, user, message: "Profile Updated"});
});

exports.uploadAvatar = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  if (user.avatar && user.avatar.public_id) {
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
  }

  const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    height: 150,
    crop: "scale",
    gravity: "auto",
  });

  const avatar = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  await User.findByIdAndUpdate(req.user.id, {avatar}, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({success: true, message: "Avatar updated"});
});

exports.getLoginMethods = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({success: true, loginMethods: user.loginMethods});
});