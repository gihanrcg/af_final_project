const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const StudentSubmissionGradingSchema = new Schema({


    instructorName :{
        type : String
    },
    details :{
        type : String
    },
    mark:{
        type:String
    },

});

module.exports = StudentSubmissionGrading = mongoose.model('StudentSubmissionGrading', StudentSubmissionGradingSchema);
