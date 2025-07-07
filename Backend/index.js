import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './database/connection.js';
import userRoutes from './Routes/userRoutes.js';

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Health check / root route
app.get('/', (req, res) => {
  res.send('This is hello from Dinesh branch!');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
