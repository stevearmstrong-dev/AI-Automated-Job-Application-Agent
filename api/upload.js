const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

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

        res.redirect('/upload-success');
    });
};