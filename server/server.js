import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js'; 
import postRoutes from './routes/postRoutes.js';


// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Allow both localhost ports for development
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // If no origin (e.g., same-origin requests), allow it
    if (!origin) return callback(null, true);
    
    // Check if origin is in the allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Otherwise, reject
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes); // Add this line
// Health check endpoint (keep this for testing)
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Server is running!',
    timestamp: new Date(),
    database: 'Connected'
  });
});
app.use('/api/posts', postRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});