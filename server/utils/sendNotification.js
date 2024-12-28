const Notification = require("../models/notificationModel");

const sendNotification = async (title, description, userId) => {
    const notification = new Notification({title, description, userId});
    await notification.save();
};

module.exports = sendNotification;