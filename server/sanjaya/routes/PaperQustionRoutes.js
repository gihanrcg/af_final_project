const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const multer = require('multer');
var path = require("path");
const x = multer;

const Paper=require('./../models/Paper');
const PaperQuestion=require('./../models/PaperQuestions');
const ExamMarks=require('./../models/ExamMarks');
//const Module=require('./../../moduleManager/Module');

router.get('/', (req, res) => {
    console.log('all Paper');
    res.json({message:'hello'});

    // AssignmentSubmission.find()
    //     .sort({ date: -1 })
    //     .then(submissions => res.json(submissions))
});

router.post('/add/:paperId', (req, res) => {
    console.log(req.body);
    try{
        let newQuestions=new PaperQuestion(
        {paperId:req.params.paperId,
        question :req.body.question,
        answers:req.body.answers,
        answer:req.body.answer,
        userAnswer:''
    });
   Paper.findOne({_id:req.params.paperId}).then((data)=>{if(data==null) 
    {
        console.log('1');
        return res.json({messege:'paper not found',succesful:false,eror:e})} 
        else {
            console.log('2');
    return newQuestions.save().then((question)=>{res.json({succesful:true,question:question})}).catch((e)=>res.status(500).json({messege:'internal server ereor',succesful:false,eror:e}));
    


} }).catch((e)=>res.status(500).json({messege:'internal server eror',succesful:false,eror:e}));
    
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

    PaperQuestion.find().then((data)=>res.json(data)).catch((e)=>res.status(404).json({messege:'method not found',succesful:false,eror:e}));
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

    Paper.findOne({_id:req.params.paperId}).then((data)=>{if(data!=null) {
        return PaperQuestion.find({paperId:req.params.paperId}).then((data)=>res.status(200).json(data)); 
    } else {
        return res.status(404).json({messege:'paper not found',succesful:false,eror:e})} }).catch((e)=>res.status(404).json({messege:'paper not found',succesful:false,eror:e}));
    }catch(e){
        console.log(e);
        res.status(404).json({messege:'paper not found',succesful:false,eror:e});
    }

    
    // AssignmentSubmission.find()
    //     .sort({ date: -1 })
    //     .then(submissions => res.json(submissions))
});

router.delete('/delete/:id', (req, res) => {
    
    try{

        PaperQuestion.findByIdAndRemove(req.params.id).then((data)=>{if(data!=null) {return res.json(data)} else {return res.status(404).json({messege:'question not found',succesful:false,eror:e})} }).catch((e)=>res.status(404).json({messege:'internal server ereor',succesful:false,eror:e}));
    }catch(e){
        console.log(e);
        res.status(404).json({messege:'paper not found',succesful:false,eror:e});
    }

    
    // AssignmentSubmission.find()
    //     .sort({ date: -1 })
    //     .then(submissions => res.json(submissions))
});

router.get('/questions/:paperId', (req, res) => {
    
    try{

        PaperQuestion.find({paperId:req.params.paperId}).then((data)=>{if(data!=null) {
        let questions=data.map((question)=>{question.answer='';return question});
        
        return res.json(
            questions
    )} else {return res.status(404).json({messege:'paper not found',succesful:false,eror:e})} }).catch((e)=>res.status(404).json({messege:'paper not found',succesful:false,eror:e}));
    }catch(e){
        console.log(e);
        res.status(404).json({messege:'paper not found',succesful:false,eror:e});
    }

    
    // AssignmentSubmission.find()
    //     .sort({ date: -1 })
    //     .then(submissions => res.json(submissions))
});

router.post('/checkAnswer/:paperId/:userId', (req, res) => {
    
    try{

    PaperQuestion.find({paperId:req.params.paperId}).then((data)=>{if(data!=null) {
        let questionswithAnswer=data;
        let userquestionswithAnswer=req.body;
        let totalCount=questionswithAnswer.length;
        let marksCount=0;
        for(let i=0;i<questionswithAnswer.length;i++){
            if(questionswithAnswer[i].answer==userquestionswithAnswer[i].userAnswer){
                   marksCount++; 
            }    
        }
        let newExamMarks=new ExamMarks({  userId:req.params.userId,
    
        paperId :req.params.paperId,
        totalQuestions :totalCount,
        totalMarks:marksCount
      });

      newExamMarks.save();
        res.json({totalCount:totalCount,marksCount:marksCount});
    
    
    } else {return res.status(404).json({messege:'paper not found',succesful:false,eror:e})} }).catch((e)=>res.status(404).json({messege:'paper not found',succesful:false,eror:e}));
    }catch(e){
        console.log(e);
        res.status(404).json({messege:'paper not found',succesful:false,eror:e});
    }

    
    // AssignmentSubmission.find()
    //     .sort({ date: -1 })
    //     .then(submissions => res.json(submissions))
});


module.exports = router;