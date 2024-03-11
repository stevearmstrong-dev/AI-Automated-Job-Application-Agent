// Inside /api/upload.js
const multer = require('multer');
const path = require('path');

// Configure storage for multer
const storage = multer.diskStorage({
    // ... your existing configuration ...
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append the date to make the filename unique
    }
});

const upload = multer({ storage: storage });

module.exports = (req, res) => {
    // Handle your upload here
    upload.single('resume')(req, {}, err => {
        if (err) {
            return res.status(500).send('Upload error');
        }
        // Do something with `req.file`...
        res.status(200).send('File uploaded successfully.');
    });
};
