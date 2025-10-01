const Product = require("../models/Product");

// Insert Sample Products
const addSampleProducts = async (req, res) => {
  try {
    const products = [
      {
        name: "T-Shirt",
        price: 500,
        category: "Clothing",
        variants: [
          { color: "Red", size: "M", stock: 20 },
          { color: "Blue", size: "L", stock: 15 }
        ]
      },
      {
        name: "Shoes",
        price: 1200,
        category: "Footwear",
        variants: [
          { color: "Black", size: "9", stock: 10 },
          { color: "White", size: "8", stock: 8 }
        ]
      }
    ];
    await Product.insertMany(products);
    res.json({ message: "✅ Sample products added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Products
const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// Get Products by Category
const getByCategory = async (req, res) => {
  const category = req.params.category;
  const products = await Product.find({ category });
  res.json(products);
};

// Get Only Variants
const getVariants = async (req, res) => {
  const products = await Product.find({}, { name: 1, variants: 1, _id: 0 });
  res.json(products);
};

module.exports = {
  addSampleProducts,
  getAllProducts,
  getByCategory,
  getVariants
};
