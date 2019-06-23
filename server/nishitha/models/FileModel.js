const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const FileSchema = new Schema({


    file :{
        type : String
    },
    submittedBy:{
        type:String
    },
    submittedDate:{
        type:Date
    },
    assignmentName:{
        type:String
    },
    moduleName:{
        type:String
    },
    isGraded:{
        type:Boolean
    }


});

module.exports = FileModel = mongoose.model('FileModel', FileSchema);
