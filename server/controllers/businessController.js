const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Business = require("../models/businessModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/userModel");
const Stripe = require("../models/stripeModel");
const sendNotification = require('../utils/sendNotification');

exports.check = catchAsyncErrors(async (req, res, next) => {

    const business = await Business.findOne({ownerId: req.user.id})
    if(!business) {
        return next(new ErrorHandler("You are not a business owner", 403));
    }
    res.status(200).json({ success: true, message: "User is a business owner" });

});

exports.create = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user.id).select("+stripeSessionId");

    if (user.role==='owner') {
        return next(new ErrorHandler("You are already a subscription user.", 403));
    }

    const payment = await Stripe.findById(req.params.id);
    if (!payment.active) {
        return next(new ErrorHandler("Payment not active", 404));
    }
    const priceId = payment.priceId;

    const business = await Business.findOne({ownerId: req.user.id})
    const businessInfo = req.body;
    if (!business) {
        businessInfo.ownerId = req.user.id;
        await Business.create( businessInfo );
    } else {
        await Business.findByIdAndUpdate(business._id, businessInfo, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
          });
    }

    const session = await stripe.checkout.sessions.create({
        success_url: process.env.STRIPE_CALLBACK_URL,
        cancel_url: process.env.CLIENT_DOMAIN + "/home",
        line_items: [
        {
            price: priceId,
            quantity: 1,
        },
        ],
        mode: 'subscription',
    });

    user.stripeSessionId = session.id;
    user.role = "pending";
    user.save();

    res.json({ url: session.url })
});

exports.updateStatus = catchAsyncErrors(async (req, res, next) => {

    const userId = req.params.id;
    const user = await User.findById(userId).select("+stripeSessionId");
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    if (!user.stripeSessionId || user.stripeSessionId===undefined || user.stripeSessionId===null) {
        return next(new ErrorHandler("User is not a subscription handler", 400));
    }
    
    const session = await stripe.checkout.sessions.retrieve(user.stripeSessionId);
    if (session && session.status === "complete") {
        user.role = req.body.role;
    } else {
        user.role = "user";
    }
    user.save();
    await sendNotification(`Business status updated`, `Dear ${user.name.split(" ")[0]}, your status has been updated to ${user.role}.`, user._id);
    res.status(200).json({success: true, message: "Status Updated"});
});

// exports.cancelAtPeriodEnd = catchAsyncErrors(async (req, res, next) => {

//     const userId = req.user.id;
//     const user = await User.findById(userId).select("+stripeSessionId");
//     const session = await stripe.checkout.sessions.retrieve(user.stripeSessionId);
//     const subscriptionId = session.subscription;
//     const canceledSubscription = await stripe.subscriptions.update(subscriptionId, {
//         cancel_at_period_end: true,
//     });
      
//     res.status(200).json({ success: true, canceledSubscription });
// });

exports.cancel = catchAsyncErrors(async (req, res, next) => {

    const userId = req.user.id;
    const user = await User.findById(userId).select("+stripeSessionId").select("+password");

    if (!user?.loginMethods.includes("password")) {
        return next(new ErrorHandler("Please set your password before cancelling subscription", 400));
    }
    
    const {password} = req.body;
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Password is incorrect", 400));
    }
    const session = await stripe.checkout.sessions.retrieve(user.stripeSessionId);
    const subscriptionId = session.subscription;
    const canceledSubscription = await stripe.subscriptions.cancel(subscriptionId);

    if (canceledSubscription) {
        user.role = "user";
        user.stripeSessionId = undefined;
        user.save();
    }
    await sendNotification(`Subscription cancelled`, `Dear ${user.name.split(" ")[0]}, your subscription has been cancelled.`, user._id);
    res.status(200).json({ success: true, message: "Membership has been canceled" });
});

exports.getBusinessData = catchAsyncErrors(async (req, res, next) => {
    const business = await Business.findOne({ownerId: req.user.id});
    if (!business) {
        res.status(200).json({ success: false, message: "User does not have any business account" });
        return;
    }
    res.status(200).json({ success: true, businessData: business });
});

exports.getAll = catchAsyncErrors(async (req, res, next) => {
    let businesses = await Business.find().populate("ownerId").select('_id organizationName ownerId');
    businesses = businesses.filter(business => business.ownerId.role!=="pending");

    const result = businesses.map(business => ({
        id: business._id,
        name: business.organizationName
    }));
    res.status(200).json({ success: true, businesses: result });
});

exports.getStatus = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("role");
    if (user.role === "admin") {
        return res.status(200).json({ success: true, headline:"Admin", message: "You have priviledges to manage user and payment data." });
    }
    const business = await Business.findOne({ownerId: req.user.id});
    if (user.role === "pending") {
        return res.status(200).json({ success: true, headline:"Business Profile Created", message: "Please be patient. Your business account application is being processed." });
    }
    if (user.role === "owner") {
        return res.status(200).json({ success: true, headline:"Business Owner", message: "Congratulations. You can register your products now." });
    }
    res.status(200).json({ success: true, headline:"User", message: "You are a general user. You can subscribe to become a business owner." });
  });

exports.getAllPending = catchAsyncErrors(async (req, res, next) => {

    const businesses = await Business.find().populate('ownerId')
    .then((results) => {
        return results.sort((a, b) => {
            const aPending = a.ownerId?.role === "pending" ? 0 : 1;
            const bPending = b.ownerId?.role === "pending" ? 0 : 1;
            return aPending - bPending;
        });
    });
    res.status(200).json({success: true, businesses});

});

exports.update = catchAsyncErrors(async (req, res, next) =>{
    const business = await Business.findOne({ownerId: req.user.id});
    if (!business) {
        return next(new ErrorHandler("Business not found", 404));
    }
    await Business.findByIdAndUpdate(business._id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    await sendNotification(`Business info updated`, `Dear ${user.name.split(" ")[0]}, your business info has been updated.`, req.user.id);
    res.status(200).json({ success: true, business, message: "Business info updated" });
});
  