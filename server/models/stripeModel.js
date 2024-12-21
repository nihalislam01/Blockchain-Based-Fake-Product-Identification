const mongoose = require('mongoose');

const stripeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    quote: {type: String, required: true},
    price: { type: String, required: true },
    session: {type: String, required: true},
    description: {
        type:[{type: String }], 
        default: []
    },
    priceId: { type: String, required: true, unique: true},
    active: { type: Boolean, required: true, default: true },
},{timestamps: true});


module.exports = mongoose.model('Stripe', stripeSchema);