// app.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './api/routes/user.route.js';
import authRoutes from './api/routes/auth.route.js';
import BlogRoute from './api/routes/blog.route.js';
import CategoryRoute from './api/routes/categories.route.js';
import path from 'path';

dotenv.config();

mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('MongoDB is Connected');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

const __dirname = path.resolve();

const app = express();

app.use(express.json());

app.use(cors({
    origin: '*', // Allow requests from all origins (for testing)
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}));

app.use('/uploads', express.static('uploads'));

app.use(cookieParser());

// Dummy authentication middleware to bypass authentication (for testing)
app.use('/api', (req, res, next) => {
    // Skip authentication for development/testing purposes
    req.user = { userId: 'dummy_user_id' }; // Set a dummy user object
    next();
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', BlogRoute);
app.use('/api/category', CategoryRoute);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
