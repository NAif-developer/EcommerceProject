const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cat: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  image: { type: String },
  description: { type: String },
}, { timestamps: true }); // to sort newly added

module.exports = mongoose.model('Product', productSchema);