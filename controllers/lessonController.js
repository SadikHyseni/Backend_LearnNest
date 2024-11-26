// import { collections } from '../config/db-config.js';
// import { ObjectId } from 'mongodb';

// // Fetch all lessons
// export const getLessons = async (req, res) => {
//   try {
//     const lessons = await collections.lessons.find({}).toArray();
//     res.status(200).json(lessons);
//   } catch (error) {
//     console.error('Error fetching lessons:', error);
//     res.status(500).json({ error: 'Failed to fetch lessons' });
//   }
// };

// // Update lesson availability
// export const updateLesson = async (req, res) => {
//   try {
//     const { id } = req.params; // Lesson ID
//     const { availableInventory } = req.body; // New availability value

//     if (typeof availableInventory !== 'number') {
//       return res.status(400).json({ error: 'Invalid availability value' });
//     }

//     const result = await collections.lessons.updateOne(
//       { _id: new ObjectId(id) },
//       { $set: { availableInventory } }
//     );

//     if (result.modifiedCount === 0) {
//       return res.status(404).json({ error: 'Lesson not found or no changes made' });
//     }

//     res.status(200).json({ message: 'Lesson updated successfully' });
//   } catch (error) {
//     console.error('Error updating lesson:', error);
//     res.status(500).json({ error: 'Failed to update lesson' });
//   }
// };