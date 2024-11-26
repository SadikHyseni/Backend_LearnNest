import express from "express";
import morgan from "morgan";
import cors from "cors";
import { collections, connectDB } from "./config/db-config.js";
import { ObjectId } from "mongodb";

const app = express();

// Middleware
app.use(morgan("short")); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(cors());

// Connect to MongoDB
(async function initializeDB() {
  await connectDB();
})();

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the LearnNest Backend!");
});

// Routes

// Get all lessons
app.get("/lessons", async (req, res) => {
  try {
    const lessons = await collections.lessons.find().toArray();
    res.status(200).json(lessons);
  } catch (error) {
    console.error("Error fetching lessons:", error);
    res.status(500).send("Error fetching lessons");
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});