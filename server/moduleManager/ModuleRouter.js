const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const multer = require('multer');
var path = require("path");
const x = multer;

const Module=require('./Module');

router.get('/', (req, res) => {
    console.log('all modules');
    res.json({message:'hello'});

    // AssignmentSubmission.find()
    //     .sort({ date: -1 })
    //     .then(submissions => res.json(submissions))
});

router.post('/add', (req, res) => {
    console.log(req.body);
    try{
    let newModule=new Module({moduleId:req.body.moduleId,field:req.body.field,year:req.body.year,semester:req.body.semester,moduleName:req.body.moduleName,enrollKey:req.body.enrollKey});
    newModule.save().then((module)=>res.json({succesful:true,module:module})).catch((e)=>res.status(400).json({messege:'Duplicate module id',succesful:false,eror:e}));
    }catch(e){
        console.log(e);
    }

    // AssignmentSubmission.find()
    //     .sort({ date: -1 })
    //     .then(submissions => res.json(submissions))
});




module.exports = router;