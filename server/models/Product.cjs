const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:          { type: String, required: true },
  cat:           { type: String, required: true },
  price:         { type: Number, required: true },
  originalPrice: { type: Number },
  image:         { type: String },
  images:        { type: [String], default: [] },
  description:   { type: String },
  stock:         { type: Number, default: 1 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
