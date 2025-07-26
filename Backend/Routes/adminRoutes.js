import express from 'express';
import {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllUsers,
  getUserById,
  deleteUser,
} from '../controllers/adminController.js';
import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from '../controllers/eventController.js';
import { protect, authorizeRoles } from '../middelwares/auth.js';
import { getCoursePurchasedByUsers } from '../controllers/adminController.js';
import { uploadImage } from '../middelwares/uploadMiddleware.js'; // New: Import upload middleware

const router = express.Router();

// All admin routes will be protected and require 'admin' role
router.use(protect); // Ensure user is authenticated
router.use(authorizeRoles('admin')); // Ensure user has admin role

// Course Management Routes
// For creating a course, we now expect an 'image' file field
router.route('/courses')
  .post(uploadImage, createCourse); // Added uploadImage middleware

// For updating a course, we also allow image upload
router.route('/courses/:id')
  .put(uploadImage, updateCourse)    // Added uploadImage middleware
  .delete(deleteCourse); // Delete a course


// New route to get users who purchased a specific course
router.get('/courses/:id/purchasers', getCoursePurchasedByUsers);

// User Management Routes (Optional)
router.route('/users')
  .get(getAllUsers); // Get all users

router.route('/users/:id')
  .get(getUserById)   // Get a single user by ID
  .delete(deleteUser); // Delete a user


// --- Event Management Routes (NEWLY MERGED) ---
// Note: These routes are now under /api/admin/events, /api/admin/events/:id
router.route('/events')
  .post(uploadImage, createEvent) // Create a new event with image upload
  

router.route('/events/:id')
 
  .put(uploadImage, updateEvent)    // Update an event with optional image upload
  .delete(deleteEvent);

export default router;