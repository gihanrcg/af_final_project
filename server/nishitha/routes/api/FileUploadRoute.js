const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const multer = require('multer');
var path = require("path");
const x = multer;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/users/fileUploads');
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname);
    }
});

const upload = multer({
    storage: storage,
});

const User = require('../../../gihan/models/User');
const File = require('../../models/FileModel');
const auth = require('../../../../middleware/auth');


router.get('/', (req, res) => {
    console.log('all files');
    File.find()
        .sort({ date: -1 })
        .then(files => res.json(files))
});

router.delete('/:id', (req, res) => {
    const id=req.params.id;
    try{
        File.deleteOne({_id:id}).then((file)=> {
            res.status(204).send({
                message: 'Delete Successful',
                data:file
            })
        })
    } catch (err) {
        res.status(500).send({
            message: 'Unknown server error',
        });
    }


});
router.get('/download/:filename',(req, res) => {
    var file = req.params.filename;
    var fileLocation = path.join('uploads/users/fileUploads/',file);
    console.log(fileLocation);
    res.download(fileLocation, file);
});
router.post('/upload', upload.single('file'), (req, res) => {
        const newFile = new File({
            file : req.file.path,
            submittedBy:req.body.submitted,
            submittedDate:new Date()
        });


    try {
        newFile.save().
        then(file =>
            res.status(200).send({
                message: 'File Upload successful',
                data:file
            })
        );
    } catch (err) {
        res.status(500).send({
            message: 'Unknown server error',
            data: newFile
        });
    }

});
module.exports = router;