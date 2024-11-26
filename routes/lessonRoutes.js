import express from 'express';
import { getLessons, updateLesson } from '../controllers/lessonController.js';

const router = express.Router();

// Route to fetch lessons
router.get('/', getLessons);

// Route to update lesson
router.put('/:id', updateLesson);

export default router;
//s
