import { collections } from "../config/db-config.js";

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
