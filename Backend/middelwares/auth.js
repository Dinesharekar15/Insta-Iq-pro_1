import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'; // A simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
import User from '../models/userModel.js';
import jwtSecret from '../config/jwt.js';

// Middleware to protect routes by verifying JWT
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the Authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, jwtSecret);

      // Find user by ID from the token payload and attach to request object
      // Exclude password from the returned user object
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      next(); // Proceed to the next middleware/route handler
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  // If no token is found
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Middleware to authorize users based on their roles
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // Check if req.user exists and its role is included in the allowed roles
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403); // Forbidden
      throw new Error(`User role ${req.user ? req.user.role : 'unauthenticated'} is not authorized to access this route`);
    }
    next(); // User is authorized, proceed
  };
};

export { protect, authorizeRoles };

