// src/controllers/eventController.js
import asyncHandler from 'express-async-handler';
import Event from '../models/eventModel.js'; // Import the Event model

// @desc    Create a new event
// @route   POST /api/admin/events
// @access  Private/Admin
const createEvent = asyncHandler(async (req, res) => {
  // Assuming 'img' (Cloudinary URL) is populated by uploadMiddleware
  const { imageUrl, type, date, month, title, time, location, desc } = req.body;
    console.log(imageUrl, type, date, month, title, time, location, desc); // Debugging line to check incoming data
  // Basic validation
  if (!imageUrl || !type || !date || !month || !title || !time || !location || !desc) {
    res.status(400);
    throw new Error('Please fill all event fields and provide an image.');
  }

  const event = await Event.create({
    imageUrl, // Use the image URL provided by the upload middleware
    type,
    date,
    month,
    title,
    time,
    location,
    desc,
  });

  if (event) {
    res.status(201).json({
      message: 'Event created successfully',
      event,
    });
  } else {
    res.status(400);
    throw new Error('Invalid event data');
  }
});

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({});

  if (events) {
    res.json(events);
  } else {
    res.status(404);
    throw new Error('No events found');
  }
});

// @desc    Get a single event by ID
// @route   GET /api/events/:id
// @access  Public
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    res.json(event);
  } else {
    res.status(404);
    throw new Error('Event not found');
  }
});

// @desc    Update an event
// @route   PUT /api/admin/events/:id
// @access  Private/Admin
const updateEvent = asyncHandler(async (req, res) => {
  const { img, type, date, month, title, time, location, desc } = req.body;
  const eventId = req.params.id;

  const event = await Event.findById(eventId);

  if (event) {
    event.img = img || event.img; // Update image if new one is provided by uploadMiddleware
    event.type = type || event.type;
    event.date = date || event.date;
    event.month = month || event.month;
    event.title = title || event.title;
    event.time = time || event.time;
    event.location = location || event.location;
    event.desc = desc || event.desc;

    const updatedEvent = await event.save();
    res.json({
      message: 'Event updated successfully',
      event: updatedEvent,
    });
  } else {
    res.status(404);
    throw new Error('Event not found');
  }
});

// @desc    Delete an event
// @route   DELETE /api/admin/events/:id
// @access  Private/Admin
const deleteEvent = asyncHandler(async (req, res) => {
  const eventId = req.params.id;

  const event = await Event.findById(eventId);

  if (event) {
    // Optional: Add logic here to delete the image from Cloudinary if needed
    await Event.deleteOne({ _id: eventId });
    res.json({ message: 'Event removed successfully' });
  } else {
    res.status(404);
    throw new Error('Event not found');
  }
});

export {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
