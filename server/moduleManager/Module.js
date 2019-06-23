const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ModuleSchema = new Schema({


    moduleId:{
        type : String
    },
    field:{
        type : String
    },

    year :{
        type : Number
    },
    semester :{
        type : Number
    },
    
    moduleName:{
        type:String
    },
    enrollKey:{
        type:String
    }
    

});

module.exports = Module = mongoose.model('Module', ModuleSchema);
