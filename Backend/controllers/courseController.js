import asyncHandler from 'express-async-handler';
import Course from '../models/courseModel.js';
import User from '../models/userModel.js';

// @desc    Get all available courses
// @route   GET /api/courses
// @access  Public (can be accessed by anyone to browse)
const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({}); // Find all courses

  if (courses) {
    res.json(courses);
  } else {
    res.status(404);
    throw new Error('No courses found');
  }
});

// @desc    Purchase a course
// @route   POST /api/courses/:id/purchase
// @access  Private (User)
const purchaseCourse = asyncHandler(async (req, res) => {
  const courseId = req.params.id;
  const userId = req.user._id; // User ID from the protected middleware

  const user = await User.findById(userId);
  const course = await Course.findById(courseId);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (!course) {
    res.status(404);
    throw new Error('Course not found');
  }

  // Check if the user has already purchased this course
  if (user.purchasedCourses.includes(courseId)) {
    res.status(400);
    throw new Error('Course already purchased');
  }

  // Add the course to the user's purchasedCourses array
  user.purchasedCourses.push(courseId);
  await user.save();

  res.status(200).json({ message: 'Course purchased successfully!', course: course.title });
});

export { getAllCourses, purchaseCourse };