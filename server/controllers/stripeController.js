const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Stripe = require("../models/stripeModel");

exports.getAll = catchAsyncErrors(async (req, res, next) => {
    const payment = await Stripe.find();
    res.status(200).json({success: true, payment});
});

exports.get = catchAsyncErrors(async (req, res, next) =>{
    const payment = await Stripe.find({active: true});
    res.status(200).json({success: true, payment});
});

exports.create = catchAsyncErrors(async (req, res, next) => {
    const body = req.body;
    const description = req.body.description.split(",").map(item => item.trim());
    body.description = description;
    const payment = await Stripe.create(req.body);
    res.status(201).json({success: true, payment, message:"Payment created successfully"});
});

exports.update = catchAsyncErrors(async (req, res, next) => {
    const payment = await Stripe.findByIdAndUpdate(req.params.paymentId, req.body, {new: true, runValidators: true});
    if (!payment) {
        return next(new ErrorHandler("Payment not found", 404));
    }
    res.status(200).json({success: true, payment});
});

exports.updateStatus = catchAsyncErrors(async (req, res, next) => {
    const payment = await Stripe.findByIdAndUpdate(req.params.paymentId, {active: req.body.active}, {new: true, runValidators: true});
    if (!payment) {
        return next(new ErrorHandler("Payment not found", 404));
    }
    res.status(200).json({success: true, message: "Payment Status Updated"});
});