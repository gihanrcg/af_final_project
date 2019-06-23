const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PaperQuestionsSchema = new Schema({


    paperId:{
        type : String
    },
    question :{
        type : String
    },
    answers:{
        type:[String]
    },
    answer:{
        type:String
    },
    userAnswer:{
        type:String
    }

});

module.exports = PaperQuestions = mongoose.model('PaperQuestions', PaperQuestionsSchema);
