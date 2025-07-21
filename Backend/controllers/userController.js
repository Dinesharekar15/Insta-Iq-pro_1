import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Course from '../models/courseModel.js'; // Import Course model to populate purchased courses

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private (User)
const getUserProfile = asyncHandler(async (req, res) => {
  // req.user is set by the protect middleware
  const user = await User.findById(req.user._id).select('-password'); // Exclude password

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      purchasedCourses: user.purchasedCourses,
    });
  } else {
    res.status(404); // Not Found
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private (User)
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // If password is provided, hash it. Password hashing is handled by the pre-save hook.
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      purchasedCourses: updatedUser.purchasedCourses,
      // No token generated here, as it's an update, not login/registration
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get courses purchased by the user
// @route   GET /api/users/purchased-courses
// @access  Private (User)
const getPurchasedCourses = asyncHandler(async (req, res) => {
  // Find the user and populate the purchasedCourses field with actual course details
  // Now includes 'imageUrl' in the populated fields
  const user = await User.findById(req.user._id).populate('purchasedCourses', 'title description price imageUrl');

  if (user) {
    res.json(user.purchasedCourses);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { getUserProfile, updateUserProfile, getPurchasedCourses };
