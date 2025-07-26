// src/Routes/eventRoutes.js
import express from 'express';
import {

  getAllEvents,
  getEventById,
  
} from '../controllers/eventController.js';

const router = express.Router();

// Public routes for events
router.get('/', getAllEvents); // Get all events
router.get('/:id', getEventById); // Get a single event by ID


export default router;
