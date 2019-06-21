const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const multer = require('multer');
var path = require("path");
const x = multer;

const AssignmentSubmission=require('../../models/AssignmentSubmission');

router.get('/', (req, res) => {
    console.log('all assignmentSubmissions');
    AssignmentSubmission.find()
        .sort({ date: -1 })
        .then(submissions => res.json(submissions))
});


router.get('/:id', (req, res) => {
    const id=req.params.id;
    try{
        AssignmentSubmission.findOne({_id:id}).then((submission)=> {
            res.status(200).send({
                message: 'Found Submission',
                data:submission
            })
        })
    } catch (err) {
        res.status(500).send({
            message: 'Unknown server error',
        });
    }


});

router.delete('/:id', (req, res) => {
    const id=req.params.id;
    try{
        AssignmentSubmission.deleteOne({_id:id}).then((submission)=> {
            res.status(204).send({
                message: 'Delete Successful',
                data:submission
            })
        })
    } catch (err) {
        res.status(500).send({
            message: 'Unknown server error',
        });
    }


});

router.post('/create',(req, res) => {
    const data=req.body;

    const newAssignmentSubmission = new AssignmentSubmission({
       //TODO
        assignmentName : data.assignmentName,
        moduleName:data.moduleName,
        isSubmitted:false,
        toBeSubmittedBy:data.toBeSubmittedBy,
        isOverdue:false,//check is overdue compare dates
    });


    try {
        newAssignmentSubmission.save().
        then(assignmentSubmission =>
            res.status(201).send({
                message: 'Addition to database successful',
                data:assignmentSubmission
            })
        );
    } catch (err) {
        res.status(500).send({
            message: 'Unknown server error',
            data: newAssignmentSubmission
        });
    }

});
module.exports = router;