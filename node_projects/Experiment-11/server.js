// Filename: server.js
const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON request body
app.use(express.json());

// In-memory array to store cards
let cards = [];
let nextId = 1;

// GET all cards
app.get("/cards", (req, res) => {
  res.json({
    success: true,
    count: cards.length,
    data: cards,
  });
});

// GET a specific card by ID
app.get("/cards/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const card = cards.find((c) => c.id === id);

  if (!card) {
    return res.status(404).json({ success: false, message: "Card not found" });
  }

  res.json({ success: true, data: card });
});

// POST - Add a new card
app.post("/cards", (req, res) => {
  const { suit, value } = req.body;

  if (!suit || !value) {
    return res
      .status(400)
      .json({ success: false, message: "Suit and value are required" });
  }

  const newCard = {
    id: nextId++,
    suit,
    value,
  };

  cards.push(newCard);

  res.status(201).json({
    success: true,
    message: "Card added successfully",
    data: newCard,
  });
});

// DELETE - Remove a card by ID
app.delete("/cards/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = cards.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: "Card not found" });
  }

  const deletedCard = cards.splice(index, 1);

  res.json({
    success: true,
    message: "Card deleted successfully",
    data: deletedCard[0],
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
