const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AssignmentSubmissionSchema = new Schema({


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

module.exports = AssignmentSubmission = mongoose.model('AssignmentSubmission', AssignmentSubmissionSchema);
