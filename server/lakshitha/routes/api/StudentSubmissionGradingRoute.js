const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const multer = require('multer');
var path = require("path");
const x = multer;

const StudentSubmissionGrading=require('../../models/StudentSubmissionGrading');

router.get('/', (req, res) => {
    console.log('all assignmentSubmissions');
    StudentSubmissionGrading.find()
        .sort({ date: -1 })
        .then(submissions => res.json(submissions))
});

router.post('/create/:id',(req, res) => {
    const data=req.body;
    console.log(req.params.id);
    const newStudentSubmissionGrading = new StudentSubmissionGrading({
        instructorName:data.instructorName,
        details:data.details,
        mark:data.mark,
    });


    try {
        newStudentSubmissionGrading.save().
        then(gradingSubmission =>
            res.status(201).send({
                message: 'Addition to database successful',
                data:gradingSubmission
            })
        );
    } catch (err) {
        res.status(500).send({
            message: 'Unknown server error',
            data: newStudentSubmissionGrading
        });
    }

});
module.exports = router;