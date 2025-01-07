const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const StripeModel = require("../models/stripeModel");
const User = require("../models/userModel");
const sendNotification = require('../utils/sendNotification');

exports.getAll = catchAsyncErrors(async (req, res, next) => {
    const payment = await StripeModel.find();
    res.status(200).json({success: true, payment});
});

exports.get = catchAsyncErrors(async (req, res, next) =>{
    const payment = await StripeModel.find({active: true});
    if (payment.length <= 0) {
        return next(new ErrorHandler("Plans are not currently available", 404));
    }
    res.status(200).json({success: true, payment});
});

exports.create = catchAsyncErrors(async (req, res, next) => {
    const body = req.body;
    const description = req.body?.description?.split(",").map(item => item.trim());
    body.description = description;
    const payment = await StripeModel.create(req.body);
    const nonAdminUsers = await User.find({ role: { $ne: "admin" } });    
    for (const user of nonAdminUsers) {
        await sendNotification("New subscription plan available", "A new subscription plan has been added. Check it out now!", user._id);
    }

    res.status(201).json({success: true, payment, message:"Payment created successfully"});
});

exports.update = catchAsyncErrors(async (req, res, next) => {
    const payment = await StripeModel.findByIdAndUpdate(req.params.paymentId, req.body, {new: true, runValidators: true});
    if (!payment) {
        return next(new ErrorHandler("Payment not found", 404));
    }
    res.status(200).json({success: true, payment});
});

exports.updateStatus = catchAsyncErrors(async (req, res, next) => {
    const payment = await StripeModel.findByIdAndUpdate(req.params.paymentId, {active: req.body.active}, {new: true, runValidators: true});
    if (!payment) {
        return next(new ErrorHandler("Payment not found", 404));
    }
    res.status(200).json({success: true, message: "Payment Status Updated"});
});