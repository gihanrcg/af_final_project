const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ExamMarksSchema = new Schema({


    userId:{
        type : String
    },

    paperId :{
        type : String
    },
    totalQuestions :{
        type : Number
    },
    totalMarks:{
        type:Number
    },
    submitDate:{
        type:Date,
        default:Date.now()
    }
   

});

module.exports = ExamMarks = mongoose.model('ExamMarks', ExamMarksSchema);
