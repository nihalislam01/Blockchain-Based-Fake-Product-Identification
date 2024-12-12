const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please Enter Your Name"]
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [
        {
          validator: validator.isEmail,
          message: 'Please provide a valid email',
        },
      ]
    },
    username: {type: String, 
      required: [true, "Please Enter a username"],
      unique: true,
    },
    bio: {type: String, default: ""},
    dateOfBirth: {type: Date, default: null},
    gender: {type: String, enum: ["", "Male", "Female", "Other"], default: ""},
    password: {type: String, select: false},
    avatar: {public_id: String, url: String},
    loginMethods: { type: [String], default: ["password"]},
    role: {type: String, default: "user"},
    isEnable: {type: Boolean, default: false},
    oauth: {
      type: {
        provider: String,
        id: String,
      },
      select: false,
    },
    token: {
      type: {
        hash: String,
        expiration: String,
      },
      select: false,
    },
    stripeSessionId: {type: String, select: false}
  });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;