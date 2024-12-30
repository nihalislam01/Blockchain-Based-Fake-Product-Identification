const Event = require('../models/eventModel');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


exports.get = catchAsyncErrors(async (req, res, next) => {
    const events = await Event.find({ userId: req.user.id }).sort({ startDate: -1 });
    res.status(200).json({ success: true, events });
});

exports.create = catchAsyncErrors(async (req, res, next) => {
    const eventInfo = req.body;
    eventInfo.userId = req.user.id;
    const event = new Event(eventInfo);
    await event.save();
    res.status(200).json({ success: true, message: "Event added.", event });
});