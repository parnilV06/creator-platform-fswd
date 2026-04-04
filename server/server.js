import dotenv from 'dotenv';
import connectDB from './config/database.js';
import { createApp } from './app.js';

import { createServer } from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

dotenv.config();

// Connect DB
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}
const PORT = process.env.PORT || 5000;
const app = createApp();
const httpServer = createServer(app);

// ===== SOCKET.IO SETUP (KEEP YOUR CODE) =====
const io = new Server(httpServer, {
  cors: {
    origin: '*', // simplify for now (testing)
  }
});

io.use((socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Auth error'));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.data.user = decoded;
    next();
  } catch {
    next(new Error('Auth error'));
  }
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
});

app.set('io', io);

// Start server
httpServer.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});