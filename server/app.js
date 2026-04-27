import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import uploadRoutes from './routes/upload.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const createMockIo = () => ({
  emit: () => {}
});

export const createApp = ({ io = null } = {}) => {
  const app = express();
  app.set('io', io || createMockIo());
  const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:3000';

  // Middleware
  app.use(cors({ origin: allowedOrigin }));
  app.use(express.json());

  // Routes
  app.use('/api/users', userRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/upload', uploadRoutes);
  app.use('/api/posts', postRoutes);

  // Health route
  app.get('/api/health', (req, res) => {
    res.json({
      message: 'Server is running!',
      timestamp: new Date(),
      database: 'Connected'
    });
  });

  // 404
  app.use((req, res, next) => {
    next({
      statusCode: 404,
      message: 'Route not found'
    });
  });

  // Error handler
  app.use(errorHandler);

  return app;
};
console.log("Testing CI and CD and automated pipeline deploymnent");

const app = createApp();
export default app;