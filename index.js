import express from 'express';

// Initialize Express app
const app = express();

// Simple test route to check if the API is working
app.get('/current', (req, res) => {
    // Get the current date and time
    const now = new Date();
    // Return the current date and time as a JSON response
    res.json({ current: now.toISOString() });
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
