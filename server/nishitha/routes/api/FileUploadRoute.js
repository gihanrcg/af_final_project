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

const AssignmentSubmission = require('../../../nishitha/models/AssignmentSubmission');
const File = require('../../models/FileModel');
const auth = require('../../../../middleware/auth');


router.get('/', (req, res) => {
    console.log('all files');
    File.find({isGraded:false})
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
router.post('/upload/:id', upload.single('file'), (req, res) => {
console.log(req.body.assignmentName);
    console.log(req.body.moduleName);

    const id=req.params.id;
    const newFile = new File({
            file : req.file.path,
            submittedBy:req.body.submittedBy,
            submittedDate:new Date(),
            assignmentName:req.body.assignmentName,
            moduleName:req.body.moduleName,
            isGraded:false
        });


    try {

        newFile.save().
        then(file =>
            res.status(200).send({
                message: 'File Upload successful',
                data:file,
            })
        ).then(()=>{
            AssignmentSubmission.findOne({_id:id}).then((submission)=> {
                submission.isSubmitted=true;
                submission.save();
            })
        });
    } catch (err) {
        res.status(500).send({
            message: 'Unknown server error',
            data: newFile
        });
    }

});
module.exports = router;