import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import BlogRoute from './routes/blog.route.js';
import CategoryRoute from './routes/categories.route.js';
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

// API routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', BlogRoute); // Assuming BlogRoute is handling the blog posts
app.use('/api/category', CategoryRoute);

// Serve frontend (static files) from the dist folder
app.use(express.static(path.join(__dirname, '/codemelding/dist')));

// Catch-all route for serving the frontend for non-API requests
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'codemelding', 'dist', 'index.html'));
});

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
