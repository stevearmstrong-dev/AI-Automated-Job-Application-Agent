const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for handling successful upload
app.get('/upload-success', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'upload-success.html'));
});

// Route for handling file upload
app.post('/api/upload', require('./api/upload'));

module.exports = app;