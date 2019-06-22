const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ModuleSchema = new Schema({


    moduleId:{
        type : String
    },

    year :{
        type : Number
    },
    semester :{
        type : Number
    },
    Field:{
        type:Boolean
    },
    moduleName:{
        type:Date
    },
    isOverdue:{
        type:Boolean
    },
    details:{
        type:String
    }

});

module.exports = Module = mongoose.model('Module', ModuleSchema);
