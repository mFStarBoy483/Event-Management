const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Get the API URL from environment variables
const apiUrl = process.env.API_URL || 'http://localhost:5000';
console.log('Backend API URL:', apiUrl);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on ${apiUrl}`));
