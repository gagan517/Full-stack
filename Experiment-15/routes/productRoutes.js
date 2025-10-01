const express = require("express");
const router = express.Router();
const {
  addSampleProducts,
  getAllProducts,
  getByCategory,
  getVariants
} = require("../controllers/productController");

// API Routes
router.post("/add-sample", addSampleProducts);
router.get("/", getAllProducts);
router.get("/category/:category", getByCategory);
router.get("/variants", getVariants);

module.exports = router;
