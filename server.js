const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3001;

// Configure storage for multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append the date to make the filename unique
    }
});

const upload = multer({ storage: storage });

// Serve static files from the "public" directory
app.use(express.static('public'));

// Route for file upload
app.post('/upload', upload.single('resume'), (req, res) => {
    // You can access the file using req.file
    console.log(req.file);

    res.send('File uploaded successfully.');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
