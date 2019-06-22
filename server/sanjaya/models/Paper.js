const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PaperSchema = new Schema({


    assignmentName :{
        type : String
    },
    moduleName :{
        type : String
    },
    isSubmitted:{
        type:Boolean
    },
    toBeSubmittedBy:{
        type:Date
    },
    isOverdue:{
        type:Boolean
    },
    details:{
        type:String
    }

});

module.exports = Paper = mongoose.model('Paper', PaperSchema);
