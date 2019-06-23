const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const multer = require('multer');
var path = require("path");
const x = multer;

const Paper=require('./../models/Paper');
const Module=require('./../../moduleManager/Module');

router.get('/', (req, res) => {
    console.log('all Paper');
    res.json({message:'hello'});

    // AssignmentSubmission.find()
    //     .sort({ date: -1 })
    //     .then(submissions => res.json(submissions))
});

router.post('/add/:moduleId', (req, res) => {
    console.log(req.body);
    try{
        let newPaper=new Paper({moduleId:req.params.moduleId,examDisplyName:req.body.examDisplyName,startDate:req.body.startDate,startTime:req.body.startTime,endTime:req.body.endTime,timeDuration:req.body.timeDuration,enrollKey:req.body.enrollKey});
   Module.findOne({moduleId:req.params.moduleId}).then((data)=>{if(data==null) 
    {
        console.log('1');
        return res.json({messege:'module not found',succesful:false,eror:e})} 
        else {
            console.log('2');
    return newPaper.save().then((paper)=>{res.json({succesful:true,paper:paper})}).catch((e)=>res.status(400).json({messege:'Duplicate paper id',succesful:false,eror:e}));
    


} }).catch((e)=>res.status(404).json({messege:'module not found',succesful:false,eror:e}));
    
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

    Paper.find().then((data)=>res.json(data)).catch((e)=>res.status(404).json({messege:'method not found',succesful:false,eror:e}));
    }catch(e){
        console.log(e);
        res.status(403).render({messege:'',succesful:false,eror:e});
    }




    // AssignmentSubmission.find()
    //     .sort({ date: -1 })
    //     .then(submissions => res.json(submissions))
});

router.get('/:paperId', (req, res) => {
    
    try{

    Paper.findOne({_id:req.params.paperId}).then((data)=>{if(data!=null) {return res.json(data)} else {return res.status(404).json({messege:'paper not found',succesful:false,eror:e})} }).catch((e)=>res.status(404).json({messege:'paper not found',succesful:false,eror:e}));
    }catch(e){
        console.log(e);
        res.status(404).json({messege:'paper not found',succesful:false,eror:e});
    }

    
    // AssignmentSubmission.find()
    //     .sort({ date: -1 })
    //     .then(submissions => res.json(submissions))
});

router.get('/findByModuleId/:moduleId', (req, res) => {
    
    try{

    Paper.findOne({moduleId:req.params.moduleId}).then((data)=>{if(data!=null) {return res.json(data)} else {return res.status(404).json({messege:'paper not found',succesful:false,eror:e})} }).catch((e)=>res.status(404).json({messege:'paper not found',succesful:false,eror:e}));
    }catch(e){
        console.log(e);
        res.status(404).json({messege:'paper not found',succesful:false,eror:e});
    }

    
    // AssignmentSubmission.find()
    //     .sort({ date: -1 })
    //     .then(submissions => res.json(submissions))
});

router.delete('/:paperId', (req, res) => {
    
    try{

    Paper.findByIdAndRemove(req.params.paperId).then((data)=>{if(data!=null) {return res.json(data)} else {return res.status(404).json({messege:'paper not found',succesful:false,eror:e})} }).catch((e)=>res.status(404).json({messege:'paper not found',succesful:false,eror:e}));
    }catch(e){
        console.log(e);
        res.status(404).json({messege:'paper not found',succesful:false,eror:e});
    }

    
    // AssignmentSubmission.find()
    //     .sort({ date: -1 })
    //     .then(submissions => res.json(submissions))
});


module.exports = router;