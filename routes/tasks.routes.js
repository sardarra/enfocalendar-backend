import express from 'express';
import { getTasks, createTask, deleteTaskByTitle, updateTaskUrgency } from '../controllers/tasks.conroller.js';

const router = express.Router();
router.use(express.json());

router.get('/', getTasks);

//router.put('/:id', updateEvent);

router.post('/', createTask);

// New delete route - deletes by title
router.delete('/title/:title', deleteTaskByTitle);

// Update task urgency by title
router.put('/title/:title/urgency', updateTaskUrgency);

//router.delete('/:id', deleteEvent);

router.get('/test', (req, res) => {
  res.json({ message: 'Backend is working!', timestamp: new Date() });
});

export default router;