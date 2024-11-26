import express from "express";
import morgan from "morgan";
import cors from "cors";
import lessonRoutes from "./routes/lessonRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { connectDB } from "./config/db-config.js";

const app = express();

// Middleware
app.use(morgan("short")); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(cors());

// Connect to MongoDB
connectDB();

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the LearnNest Backend!");
});

// Routes
app.use("/lessons", lessonRoutes);
app.use("/orders", orderRoutes);

// 404 route
app.use((req, res) => {
  res.status(404).send("Page not found!");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});