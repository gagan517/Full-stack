// server.js
const express = require("express");
const app = express();

app.use(express.json());

// Seats in memory
let seats = {
  "1": { status: "available", lockedBy: null, lockTime: null },
  "2": { status: "available", lockedBy: null, lockTime: null },
  "3": { status: "available", lockedBy: null, lockTime: null },
  "4": { status: "available", lockedBy: null, lockTime: null },
  "5": { status: "available", lockedBy: null, lockTime: null }
};

// Lock expiry (1 minute)
const LOCK_TIMEOUT = 60 * 1000;

// Function to release expired locks
function cleanExpiredLocks() {
  const now = Date.now();
  for (const seatId of Object.keys(seats)) {
    const seat = seats[seatId];
    if (seat.status === "locked" && now - seat.lockTime > LOCK_TIMEOUT) {
      seat.status = "available";
      seat.lockedBy = null;
      seat.lockTime = null;
    }
  }
}

// 👉 Get all seats
app.get("/seats", (req, res) => {
  cleanExpiredLocks();
  res.json(seats);
});

// 👉 Lock a seat
app.post("/lock/:id", (req, res) => {
  cleanExpiredLocks();
  const seatId = req.params.id;
  const userId = req.body.userId;

  if (!seats[seatId]) {
    return res.status(404).json({ message: "Seat not found" });
  }
  if (seats[seatId].status === "booked") {
    return res.status(400).json({ message: "Seat already booked" });
  }
  if (seats[seatId].status === "locked") {
    return res.status(400).json({ message: "Seat already locked" });
  }

  seats[seatId].status = "locked";
  seats[seatId].lockedBy = userId;
  seats[seatId].lockTime = Date.now();

  res.json({ message: `Seat ${seatId} locked by ${userId}` });
});

// 👉 Confirm booking
app.post("/confirm/:id", (req, res) => {
  cleanExpiredLocks();
  const seatId = req.params.id;
  const userId = req.body.userId;

  if (!seats[seatId]) {
    return res.status(404).json({ message: "Seat not found" });
  }
  if (seats[seatId].status === "available") {
    return res.status(400).json({ message: "Seat not locked" });
  }
  if (seats[seatId].status === "booked") {
    return res.status(400).json({ message: "Seat already booked" });
  }
  if (seats[seatId].lockedBy !== userId) {
    return res.status(403).json({ message: "You don’t hold the lock" });
  }

  seats[seatId].status = "booked";
  seats[seatId].lockedBy = null;
  seats[seatId].lockTime = null;

  res.json({ message: `Seat ${seatId} booked successfully by ${userId}` });
});

// Start server
app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
