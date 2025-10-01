const express = require("express");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/products", productRoutes);

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
