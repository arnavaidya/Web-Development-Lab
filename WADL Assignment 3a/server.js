const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Logging middleware for debugging
app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.path}`);
  next();
});

// API endpoint to fetch random joke
app.get('/api/joke', async (req, res) => {
  console.log('Fetching a joke...');
  try {
    // Using the JokeAPI for random jokes
    const response = await axios.get('https://v2.jokeapi.dev/joke/Programming,Miscellaneous?type=twopart');
    console.log('API Response:', response.data); // Log the full response
    
    // Send the joke to frontend
    res.json({
      setup: response.data.setup,
      punchline: response.data.delivery,
      category: response.data.category,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('API Error:', error.message);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
});

app.get('/', (req, res) => {
  res.send('Server is running! Try /api/joke');
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
