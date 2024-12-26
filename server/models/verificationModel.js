const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
    status: { type: Boolean, required: true },
    productId: { type: String, required: true },
    businessId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Business'},
    verifiedBy: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
},{timestamps: true});

module.exports = mongoose.model('Verification', verificationSchema);