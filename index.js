import express from 'express';

// Initialize Express app
const app = express();

// Simple test route to check if the API is working
app.use('/test', (req, res) => {
    res.send( message: "Vercel is working!" );
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
