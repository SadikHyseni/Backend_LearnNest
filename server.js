import express from "express";
import morgan from "morgan";
import cors from "cors";
import { collections, connectDB } from "./config/db-config.js";
import { ObjectId } from "mongodb";
import path from "path";
import { fileURLToPath } from "url";
const app = express();

// Middleware
app.use(morgan("short")); // Logging

// Resolve the __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the static path
const staticPath = path.resolve("static");
app.use("/static", express.static(staticPath));
app.use(express.static(staticPath)); // Serve files from the 'static' folder


app.use(express.json()); // Parse JSON bodies
app.use(cors());

// Connect to MongoDB
(async function initializeDB() {
  await connectDB();
})();

// Health Check Route
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the LearnNest Backend!");
});
// Routes

// Get all lessons
app.get("/lessons", async (req, res) => {
  try {
    const lessons = await collections.lessons.find().toArray();

    const lessonsWithImages = lessons.map((lesson) => ({
      ...lesson,
      // Use the `static` folder for serving images
      image: lesson.image ? `/static/${lesson.image}` : "/static/default.png",
    }));

    res.status(200).json(lessonsWithImages);
  } catch (error) {
    console.error("Error fetching lessons:", error);
    res.status(500).json({ message: "Error fetching lessons" });
  }
});

// Search Lessons
app.get("/search", async (req, res) => {
  const searchTerm = req.query.q;

  if (!searchTerm || searchTerm.trim() === "") {
    return res.status(400).send("Search term is required");
  }

  const isNumeric = !isNaN(Number(searchTerm));

  try {
    const query = {
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { location: { $regex: searchTerm, $options: "i" } },
        ...(isNumeric ? [{ price: Number(searchTerm) }, { availableInventory: Number(searchTerm) }] : []),
      ],
    };

    const lessons = await collections.lessons.find(query).toArray();

    const lessonsWithImages = lessons.map((lesson) => ({
      ...lesson,
      image: lesson.image ? `/static/${lesson.image}` : "/static/default.png",
    }));

    res.status(200).json(lessonsWithImages);
  } catch (error) {
    console.error("Error performing search:", error);
    res.status(500).send("Error performing search");
  }
});

// Get all orders
app.get("/orders", async (req, res) => {
  try {
    const orders = await collections.orders.find().toArray();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send("Error fetching orders");
  }
});

// Create a new order
app.post("/orders", async (req, res) => {
  try {
    const order = req.body;
    const result = await collections.orders.insertOne(order);
    res.status(201).json({ message: "Order created successfully", orderId: result.insertedId });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send("Error creating order");
  }
});

// Update a lesson's availability
app.put("/lessons/:id", async (req, res) => {
  const { id } = req.params;
  const { availableInventory } = req.body;

  try {
    const result = await collections.lessons.updateOne(
      { _id: new ObjectId(id) },
      { $set: { availableInventory } }
    );

    if (result.matchedCount === 0) {
      res.status(404).send("Lesson not found");
    } else {
      res.status(200).json({ message: "Lesson updated successfully" });
    }
  } catch (error) {
    console.error("Error updating lesson:", error);
    res.status(500).send("Error updating lesson");
  }
});

// Delete a lesson
app.delete("/lessons/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await collections.lessons.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      res.status(404).send("Lesson not found");
    } else {
      res.status(200).json({ message: "Lesson deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting lesson:", error);
    res.status(500).send("Error deleting lesson");
  }
});

// 404 route
app.use((req, res) => {
  res.status(404).send("Page not found!");
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});