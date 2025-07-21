import asyncHandler from 'express-async-handler';
import Contact from '../models/contactModel.js'; // Import Contact model

// @desc    Submit a contact form message
// @route   POST /api/contact
// @access  Public
const submitContactForm = asyncHandler(async (req, res) => {
  const { name, email, subject, message, phone } = req.body;

  // Validate required fields
  if (!name || !email || !subject || !message) {
    res.status(400);
    throw new Error('Please fill all required fields: name, email, subject, and message');
  }

  const contactMessage = await Contact.create({
    name,
    email,
    subject, // Added subject
    message,
    phone, // Added phoneNumber (optional, so no validation check here)
  });

  if (contactMessage) {
    res.status(201).json({
      message: 'Your message has been sent successfully!',
      data: contactMessage,
    });
  } else {
    res.status(400);
    throw new Error('Failed to send message');
  }
});

export { submitContactForm };
