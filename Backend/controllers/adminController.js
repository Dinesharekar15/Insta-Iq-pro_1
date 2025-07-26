import asyncHandler from 'express-async-handler';
import Course from '../models/courseModel.js';
import User from '../models/userModel.js';

// @desc    Create a new course
// @route   POST /api/admin/courses
// @access  Private/Admin
const createCourse = asyncHandler(async (req, res) => {
  // imageUrl will now come from req.body, populated by uploadMiddleware
  // NEW: details array is also expected in req.body
  const { title, description, price, imageUrl, details } = req.body;

  // Basic validation
  if (!title || !description || !price || !imageUrl) {
    res.status(400);
    throw new Error('Please include title, description, price, and an image for the course.');
  }

  // Check if a course with the same title already exists
  const courseExists = await Course.findOne({ title });

  if (courseExists) {
    res.status(400);
    throw new Error('Course with this title already exists');
  }

  const course = await Course.create({
    title,
    description,
    price,
    imageUrl, // Use the imageUrl provided by the upload middleware
    details: details || [], // NEW: Save details, default to empty array if not provided
  });

  if (course) {
    res.status(201).json({
      message: 'Course created successfully',
      course,
    });
  } else {
    res.status(400);
    throw new Error('Invalid course data');
  }
});


// @desc    Update an existing course
// @route   PUT /api/admin/courses/:id
// @access  Private/Admin
const updateCourse = asyncHandler(async (req, res) => {
  // imageUrl will now come from req.body, populated by uploadMiddleware (if a new file is uploaded)
  // NEW: details array can also be updated
  const { title, description, price, imageUrl, details } = req.body;
  const courseId = req.params.id;

  const course = await Course.findById(courseId);

  if (course) {
    // Check if the new title conflicts with another course (excluding itself)
    if (title && title !== course.title) {
      const titleExists = await Course.findOne({ title, _id: { $ne: courseId } });
      if (titleExists) {
        res.status(400);
        throw new Error('Another course with this title already exists');
      }
    }

    course.title = title || course.title;
    course.description = description || course.description;
    course.price = price || course.price;
    // Update imageUrl only if a new one is provided by the upload middleware
    if (imageUrl) {
      course.imageUrl = imageUrl;
    }
    // NEW: Update details if provided
    if (details !== undefined) { // Allow setting to empty array
      course.details = details;
    }

    const updatedCourse = await course.save();
    res.json({
      message: 'Course updated successfully',
      course: updatedCourse,
    });
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});


// @desc    Delete a course
// @route   DELETE /api/admin/courses/:id
// @access  Private/Admin
const deleteCourse = asyncHandler(async (req, res) => {
  const courseId = req.params.id;

  const course = await Course.findById(courseId);

  if (course) {
    // Optional: Add logic here to delete the image from Cloudinary if needed
    // This would involve extracting the public ID from the imageUrl and calling cloudinary.uploader.destroy()

    await Course.deleteOne({ _id: courseId }); // Use deleteOne for Mongoose 6+
    res.json({ message: 'Course removed successfully' });
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

// @desc    Get all users (optional Admin capability)
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  // Find all users and exclude their passwords
  const users = await User.find({}).select('-password');

  if (users) {
    res.json(users);
  } else {
    res.status(404);
    throw new Error('No users found');
  }
});

// @desc    Get a single user by ID (optional Admin capability)
// @route   GET /api/admin/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId).select('-password').populate('purchasedCourses', 'title description price imageUrl');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


// @desc    Delete a user (optional Admin capability)
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);

  if (user) {
    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user._id.toString()) {
      res.status(400);
      throw new Error('Cannot delete your own admin account via this route');
    }
    await User.deleteOne({ _id: userId });
    res.json({ message: 'User removed successfully' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const getCoursePurchasedByUsers = asyncHandler(async (req, res) => {
  const courseId = req.params.id;

  // Find the course and populate the 'purchasedBy' field with user details (excluding passwords)
  const course = await Course.findById(courseId).populate('purchasedBy', 'name email');

  if (course) {
    res.json({
      _id: course._id,
      title: course.title,
      description: course.description,
      price: course.price,
      imageUrl: course.imageUrl,
      purchasedBy: course.purchasedBy, // This will now contain user objects
    });
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

export {
  createCourse,
  updateCourse,
  deleteCourse,
  getCoursePurchasedByUsers,
  getAllUsers,
  getUserById,
  deleteUser,
};