const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const FileSchema = new Schema({


    file :{
        type : String
    },
});

module.exports = FileModel = mongoose.model('FileModel', FileSchema);
