import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import BlogRoute from './routes/blog.route.js';
import CategoryRoute from './routes/categories.route.js';
import path from 'path';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO)
    .then(() => console.log('MongoDB is Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'https://codemelding.com/',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
}));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

// API routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', BlogRoute);
app.use('/api/category', CategoryRoute);


// Global error handling middleware
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        statusCode: err.statusCode || 500,
        message: err.message || 'Internal Server Error',
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
