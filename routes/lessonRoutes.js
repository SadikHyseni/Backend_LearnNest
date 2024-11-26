import express from 'express';
import { getLessons, updateLesson } from '../controllers/lessonController.js';

const router = express.Router();

router.get('/', getLessons);       // GET /lessons
router.put('/:id', updateLesson);  // PUT /lessons/:id

export default router;
