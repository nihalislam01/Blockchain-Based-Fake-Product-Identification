const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true},
    hashedValue: { type: String, required: true },
    businessId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Business'},
},{timestamps: true});

productSchema.index({ businessId: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model('Product', productSchema);