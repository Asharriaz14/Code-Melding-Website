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
    // Set a limit for JSON and URL-encoded bodies
    app.use(express.json({ limit: '20mb' })); 
    app.use(express.urlencoded({ limit: '20mb', extended: true }));

    // Middleware to parse incoming JSON requests
    app.use(express.json());

    // CORS configuration
    app.use(cors({
        origin: '*', // Replace this with your live frontend URL
        methods: 'GET,POST,PUT,DELETE',
        credentials: true // Allows cookies and other credentials to be sent
    }));

    // Serve static files from the 'uploads' folder
    app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

    // Middleware to parse cookies
    app.use(cookieParser());

    // API routes
    app.use('/api/user', userRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/post', BlogRoute); 
    app.use('/api/category', CategoryRoute);


    // Global error handling middleware
    app.use((err, req, res, next) =>    {
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
