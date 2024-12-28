const Notification = require('../models/notificationModel');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


exports.get = catchAsyncErrors(async (req, res, next) => {
    const notifications = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, notifications });
});

exports.deleteNotification = catchAsyncErrors(async (req, res, next) => {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
        return next(new ErrorHandler("Notification not found", 404));
    }
    res.status(200).json({ success: true, message: "Notification deleted" });
});