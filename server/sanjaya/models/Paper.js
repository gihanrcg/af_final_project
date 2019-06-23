const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PaperSchema = new Schema({


    moduleID:{
        type : String
    },
    examDisplyName :{
        type : String
    },
    enrollkey:{
        type:String
    },
    startDate:{
        type:String
    },
    startTime:{
        type:String
    },
    endTime:{
        type:String
    },
    timeDuration:{
        type:Number
    }

});

module.exports = Paper = mongoose.model('Paper', PaperSchema);
