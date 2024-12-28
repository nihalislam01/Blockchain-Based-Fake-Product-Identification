const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
},{timestamps: true});

module.exports = mongoose.model('Notification', notificationSchema);