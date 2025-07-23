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

export default router;