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
        res.status(403).json({messege:'',succesful:false,eror:e});
    }

    // AssignmentSubmission.find()
    //     .sort({ date: -1 })
    //     .then(submissions => res.json(submissions))
});


router.get('/all', (req, res) => {
    
    try{

    Module.find().then((data)=>res.json(data)).catch((e)=>res.status(404).json({messege:'method not found',succesful:false,eror:e}));
    }catch(e){
        console.log(e);
        res.status(403).render({messege:'',succesful:false,eror:e});
    }

    // AssignmentSubmission.find()
    //     .sort({ date: -1 })
    //     .then(submissions => res.json(submissions))
});


router.post('/findModules', (req, res) => {
        console.log('findmodule');
        console.log('body',req.body);
    try{

    Module.find({field:req.body.field}).then((data)=>res.json(data)).catch((e)=>res.status(404).json({messege:'method not found',succesful:false,eror:e}));
    }catch(e){
       
        res.status(403).render({messege:'',succesful:false,eror:e});
    }

    // AssignmentSubmission.find()
    //     .sort({ date: -1 })
    //     .then(submissions => res.json(submissions))
});
router.get('/:moduleId', (req, res) => {
    
    try{

    Module.findOne({moduleId:req.params.moduleId}).then((data)=>{if(data!=null) {return res.json(data)} else {return res.status(404).json({messege:'module not found',succesful:false,eror:e})} }).catch((e)=>res.status(404).json({messege:'module not found',succesful:false,eror:e}));
    }catch(e){
        console.log(e);
        res.status(404).json({messege:'module not found',succesful:false,eror:e});
    }

    
    // AssignmentSubmission.find()
    //     .sort({ date: -1 })
    //     .then(submissions => res.json(submissions))
});

router.delete('/:moduleId', (req, res) => {
    
    try{

    Module.findByIdAndRemove(req.params.moduleId).then((data)=>{if(data!=null) {return res.json(data)} else {return res.status(404).json({messege:'module not found',succesful:false,eror:e})} }).catch((e)=>res.status(404).json({messege:'module not found',succesful:false,eror:e}));
    }catch(e){
        console.log(e);
        res.status(404).json({messege:'module not found',succesful:false,eror:e});
    }

    
    // AssignmentSubmission.find()
    //     .sort({ date: -1 })
    //     .then(submissions => res.json(submissions))
});


module.exports = router;