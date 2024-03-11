require('dotenv').config();
const multer = require('multer');
const path = require('path');
const { Storage } = require('@google-cloud/storage');

const storage = new Storage();

const bucket = storage.bucket('resume-global');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
});

module.exports = (req, res) => {
    upload.single('resume')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            console.error('Multer error:', err);
            return res.status(500).send('Upload error');
        } else if (err) {
            console.error('Unknown error:', err);
            return res.status(500).send('Upload error');
        }

        console.log('File uploaded:', req.file);
        console.log('Form data:', req.body);

        const blob = bucket.file(Date.now() + path.extname(req.file.originalname));
        const blobStream = blob.createWriteStream();

        blobStream.on('error', (err) => {
            console.error('Error uploading to Google Cloud Storage:', err);
            res.status(500).send('Upload error');
        });

        blobStream.on('finish', () => {
            console.log('File uploaded to Google Cloud Storage');
            res.redirect('/upload-success');
        });

        blobStream.end(req.file.buffer);
    });
};