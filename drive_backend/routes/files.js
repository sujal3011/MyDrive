const express = require('express')
const router = express.Router();
const upload = require('../middleware/upload');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');

const mongoURL = process.env.MONGO_URL

const conn = mongoose.createConnection(mongoURL);
let gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");

})





// Uploading a new file

router.post('/upload', upload.single('file'), (req, res) => {
    res.json({ file: req.file });
})

// Getting all files

router.get('/getallfiles', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        if (!files || files.length === 0) {
            return res.status(404).json({ error: "No files exist" });
        }
        return res.json(files);
    })
})

//Getting a file by its filename

router.get('/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }
        // File exists
        return res.json(file);
    });
});



module.exports=router