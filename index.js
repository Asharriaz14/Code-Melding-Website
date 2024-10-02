import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS
import userRoutes from './api/routes/user.route.js';
import authRoutes from './api/routes/auth.route.js';
import cookieParser from 'cookie-parser';
import BlogRoute from './api/routes/blog.route.js';
import CategoryRoute from './api/routes/categories.route.js';
import path from 'path';

// Initialize dotenv to load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('MongoDB is Connected');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

// Get the current directory
const __dirname = path.resolve();

// Initialize Express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// CORS configuration
app.use(cors({
    origin: 'https://codemelding.com/', // Replace this with your live frontend URL
    methods: 'GET,POST,PUT,DELETE',
    credentials: true // Allows cookies and other credentials to be sent
}));

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static('uploads'));

// Middleware to parse cookies
app.use(cookieParser());

// Root route to check if the server is working
app.get('/', (req, res) => {
    res.send('API is working!');
});

// API routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', BlogRoute); // Assuming BlogRoute is handling the blog posts
app.use('/api/category', CategoryRoute);

// Global error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
