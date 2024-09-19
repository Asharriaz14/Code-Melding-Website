import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
// import postRoute from './routes/post.route.js'
import BlogRoute from './routes/blog.route.js'

dotenv.config();
mongoose.connect(process.env.MONGO).then(()=> {
    console.log('MongoDB is Connected');
}).catch((err)=> {
    console.log(err);
})

const app = express();

app.use(express.json());
// Serve static files from the 'uploads' folder
app.use('/uploads', express.static('uploads'));

app.listen(3000, () => {
    console.log('Server is runnning on port 3000')
}
)

app.use(cookieParser());
app.use('/api/user', userRoutes);
app.use('/api/auth' , authRoutes);
// app.use('/api/post', postRoute);
app.use('/api/post',  BlogRoute );

app.use ((err, req, res, next) => {
const statusCode = err.statusCode || 500;
const message = err.message || 'Internal Server Error';
res.status(statusCode).json({
    success: false,
    statusCode,
    message
});
});