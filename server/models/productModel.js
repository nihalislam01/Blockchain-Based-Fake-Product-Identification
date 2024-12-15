const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true},
    hashedValue: { type: String, required: true },
    ownerId: {type: mongoose.Schema.Types.ObjectId, required: true, unique: true, ref: 'User'},
},{timestamps: true});

module.exports = mongoose.model('Product', productSchema);