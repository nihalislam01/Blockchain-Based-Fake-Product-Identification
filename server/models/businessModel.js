const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  organizationName: {type: String, required: true, unique: true, trim: true},
  address:{
    country: String,
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  contactEmail: {type: String, required: true, trim: true},
  contactPhone: {type: String, trim: true},
  website: {type: String, trim: true},
  ownerId: {type: mongoose.Schema.Types.ObjectId, required: true, unique: true, ref: 'User'},
});

module.exports = mongoose.model('Business', businessSchema);
