const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  price:       { type: Number, required: true },
  stock:       { type: Number, required: true, default: 0 },
  code:        { type: String, required: true, unique: true },
  thumbnail:   { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
