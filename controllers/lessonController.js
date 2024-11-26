import { collections } from "../config/db-config.js";
import { ObjectId } from 'mongodb';


// Fetch all lessons
export const getLessons = async (req, res) => {
  const { sortBy, sortDirection } = req.params;
  const sortCriteria = { [sortBy]: sortDirection === "ascending" ? 1 : -1 };

  try {
    const lessons = await collections.lessons.find({}).sort(sortCriteria).toArray();
    res.json(lessons);
  } catch (error) {
    console.error("Error fetching lessons:", error);
    res.status(500).json({ error: "Failed to fetch lessons" });
  }
};


export const updateLesson = async (req, res) => {
    try {
      const { id } = req.params; // Get the lesson ID from the request parameters
      const { availableInventory } = req.body; // Get the updated availability from the request body
  
      // Ensure the availability is provided and is a number
      if (typeof availableInventory !== 'number') {
        return res.status(400).json({ error: 'Invalid availability value' });
      }
  
      // Update the lesson in the database
      const result = await collections.lessons.updateOne(
        { _id: ObjectId.createFromHexString(id.toString()) }, // Filter by the lesson ID
        { $set: { availableInventory } } // Update the `availableInventory` field
      );
  
      if (result.modifiedCount === 0) {
        return res.status(404).json({ error: 'Lesson not found or no change in availability' });
      }
  
      // Send success response
      res.status(200).json({ message: 'Lesson availability updated successfully' });
    } catch (error) {
      console.error('Error updating lesson availability:', error);
      res.status(500).json({ error: 'Failed to update lesson availability' });
    }
  };