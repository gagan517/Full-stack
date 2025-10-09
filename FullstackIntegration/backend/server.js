// backend/server.js

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

// Initialize Socket.io server
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for testing
    methods: ["GET", "POST"],
  },
});

// Handle socket connection
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  // When a client sends a message
  socket.on("send_message", (data) => {
    console.log("📩 Message received:", data);
    io.emit("receive_message", data); // Broadcast to all clients
  });

  // When a client disconnects
  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

// Run the server
const PORT = 5000;
server.listen(PORT, () => console.log(`✅ Chat Server running on port ${PORT}`));
