const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({

    
    notificationType : {
        type : String,
        required : true
    },
    audience : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
    expire : {
        type : Boolean,
        default : false
    },
    date:{
        type : Date,
        default : Date.now()
    }
})

module.exports = Notification = mongoose.model('Notification',NotificationSchema);
