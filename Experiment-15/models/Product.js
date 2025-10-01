const mongoose = require("mongoose");

// Variant Schema
const variantSchema = new mongoose.Schema({
  color: String,
  size: String,
  stock: Number
});

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  variants: [variantSchema]   // Nested documents
});

module.exports = mongoose.model("Product", productSchema);
