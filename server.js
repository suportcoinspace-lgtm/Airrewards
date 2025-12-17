const express = require('express');
const path = require('path');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting to prevent abuse
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});

// Apply rate limiting to all routes
app.use(limiter);

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve Web3.js from node_modules
app.use('/lib', express.static(path.join(__dirname, 'node_modules/web3/dist')));

// Main route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 AirRewards server running on port ${PORT}`);
    console.log(`📱 Access the application at http://localhost:${PORT}`);
});
