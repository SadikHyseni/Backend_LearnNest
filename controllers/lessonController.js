import { getCollection } from '../config/db.js';
import { ObjectId } from 'mongodb';

export const getLessons = async (req, res) => {
  try {
    const lessons = await getCollection('lessons').find({}).toArray();
    res.json(lessons);
  } catch (error) {
    console.error('Error fetching lessons:', error);
    res.status(500).json({ error: 'Failed to fetch lessons' });
  }
};

export const updateLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const { availableInventory } = req.body;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid lesson ID' });
      }

    if (availableInventory === undefined || availableInventory === null) {
      return res
        .status(400)
        .json({ error: 'Missing "availableInventory" in request body' });
    }

    const result = await getCollection('lessons').updateOne(
      { _id: ObjectId.createFromHexString(id) },
      { $set: { availableInventory } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    res.json({ message: 'Lesson updated successfully' });
  } catch (error) {
    console.error('Error updating lesson:', error);
    res.status(500).json({ error: 'Failed to update lesson' });
  }
};
