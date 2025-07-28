import express from 'express';
import mongoose, { get } from 'mongoose';
import Events from '../models/Events.js';
import { getEvents, createEvent, deleteEvent, updateEvent   } from '../controllers/event.controller.js';

const router = express.Router();
router.use(express.json()); // Middleware to parse JSON bodies

router.get('/', getEvents);

router.put('/:id', updateEvent);

router.post('/', createEvent);

router.delete('/:id', deleteEvent);

// Add this at the top of your routes file for testing
router.get('/test', (req, res) => {
  res.json({ message: 'Backend is working!', timestamp: new Date() });
});

export default router;