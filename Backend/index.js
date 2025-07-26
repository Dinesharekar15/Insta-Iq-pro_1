import express from 'express';
import cors from 'cors'; // Import cors middleware
import dotenv from 'dotenv';
import connectDB from './config/connection.js'; // Updated path for db connection
import authRoutes from './Routes/authRoutes.js';
import userRoutes from './Routes/userRoutes.js'; // CORRECTED: This should import userRoutes.js
import courseRoutes from './Routes/courseRoutes.js';
import contactRoutes from './Routes/contactRoutes.js';
import adminRoutes from './Routes/adminRoutes.js'; // New: Import admin routes
import eventRoutes from './Routes/eventRoutes.js'; // New: Import event routes

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize app
const app = express();

// Middleware
app.use(cors()); // Use cors middleware
app.use(express.json()); // Middleware to parse JSON request bodies

// Basic route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // Now correctly using userRoutes.js
app.use('/api/courses', courseRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/events', eventRoutes); // New: Mount event routes

// Error handling middleware (for asyncHandler errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Don't expose stack in production
  });
});

const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
