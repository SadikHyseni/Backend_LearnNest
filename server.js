import cors from 'cors';
import express from 'express';
import { connectDB } from './config/db.js';
import lessonRoutes from './routes/lessonRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();
const PORT =  process.env.PORT || 8080;

// Log environment-specific details
if (process.env.PORT) {
  console.log('Running on AWS Elastic Beanstalk');
} else {
  console.log('Running locally on port', PORT);
}

//Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://sadikhyseni.github.io/LearnNest/',
  optionsSuccessStatus: 200,
}));
app.use(express.json());

// Database connection
(async () => {
    await connectDB(); // Ensure DB is connected before starting server
})();

// Routes
app.use('/lessons', lessonRoutes);
app.use('/orders', orderRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
