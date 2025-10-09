// Import express
const express = require('express');
const app = express();

// ======================
// 1️⃣ Logging Middleware
// ======================
app.use((req, res, next) => {
  const currentTime = new Date().toISOString();
  console.log(`[${currentTime}] ${req.method} ${req.url}`);
  next(); // pass control to next middleware
});

// ======================
// 2️⃣ Authentication Middleware
// ======================
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];

  // Check if Authorization header exists
  if (!authHeader) {
    return res.status(401).json({ message: 'Missing Authorization header' });
  }

  // Split "Bearer tokenvalue"
  const token = authHeader.split(' ')[1];

  // Check if token is valid
  if (token === 'mysecrettoken') {
    next(); // allow request to continue
  } else {
    res.status(403).json({ message: 'Invalid or missing token' });
  }
}

// ======================
// 3️⃣ Routes
// ======================

// Public route (no authentication)
app.get('/public', (req, res) => {
  res.send('This is a PUBLIC route, accessible to everyone.');
});

// Protected route (requires valid token)
app.get('/protected', authMiddleware, (req, res) => {
  res.send('This is a PROTECTED route, access granted ✅');
});

// ======================
// 4️⃣ Start the Server
// ======================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
