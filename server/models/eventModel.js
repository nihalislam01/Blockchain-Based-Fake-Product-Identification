const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    description: { type: String },
    userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
},{timestamps: true});

module.exports = mongoose.model('Event', eventSchema);