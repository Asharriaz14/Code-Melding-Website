import express from 'express';

// Initialize Express app
const app = express();

// Root route to handle requests to '/'
app.get('/', (req, res) => {
    res.status(200).send('Welcome to the API!');
});

// Simple test route to check if the API is working
app.get('/test', (req, res) => {
    res.status(200).json({ message: "Vercel is working!" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
