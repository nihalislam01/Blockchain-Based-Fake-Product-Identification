const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Business = require("../models/businessModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/userModel");

exports.check = catchAsyncErrors(async (req, res, next) => {

    const business = await Business.findOne({ownerId: req.user.id})
    if(!business) {
        return next(new ErrorHandler("You are not a business owner", 403));
    }
    res.status(200).json({ success: true, message: "User is a business owner" });

});

exports.create = catchAsyncErrors(async (req, res, next) => {

    const priceId = req.params.id;
    var price = process.env.MONTHLY_PRICE_ID;
    if (priceId == "1") {
        price = process.env.YEARLY_PRICE_ID;
    } else if (priceId != "0" && priceId != "1") {
        return next(new ErrorHandler("Invalid price ID", 400));
    }

    const business = await Business.findOne({ownerId: req.user.id})

    if (!business) {
        const businessInfo = req.body;
        await Business.create( {organizationName: businessInfo.organizationName, 
            ownerId: req.user.id, contactEmail: businessInfo.contactEmail, 
        "address.country": businessInfo.country, "address.street": businessInfo.street, 
        "address.state": businessInfo.state, "address.zipCode": businessInfo.zipCode,
        "address.city": businessInfo.city} );
    }

    const session = await stripe.checkout.sessions.create({
        success_url: process.env.STRIPE_CALLBACK_URL,
        cancel_url: process.env.CLIENT_DOMAIN + "/profile",
        line_items: [
        {
            price: price,
            quantity: 1,
        },
        ],
        mode: 'subscription',
    });
    const user = await User.findById(req.user.id).select("+stripeSessionId");
    user.stripeSessionId = session.id;
    user.save();

    res.json({ url: session.url })
});

exports.updateStatus = catchAsyncErrors(async (req, res, next) => {

    const userId = req.user.id;
    const user = await User.findById(userId).select("+stripeSessionId");
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    if (!user.stripeSessionId || user.stripeSessionId===undefined || user.stripeSessionId===null) {
        return next(new ErrorHandler("User is not a subscription handler", 400));
    }
    
    const session = await stripe.checkout.sessions.retrieve(user.stripeSessionId);
    if (session && session.status === "complete") {
        user.role = "owner";
    } else {
        user.role = "user";
    }
    user.save();
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
    const user = await User.findById(userId).select("+stripeSessionId");
    const session = await stripe.checkout.sessions.retrieve(user.stripeSessionId);
    const subscriptionId = session.subscription;
    const canceledSubscription = await stripe.subscriptions.cancel(subscriptionId);

    if (canceledSubscription) {
        user.role = "user";
        user.stripeSessionId = undefined;
        user.save();
    }
    
    res.status(200).json({ success: true, canceledSubscription });
});