const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({

    userType: {
        type: String,
        required : true
    },
    idNo :{
        type : String,
        required : true
    },
    course:{
        type : String,
        required : true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    dob: {
        type: Date,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }

});

module.exports = User = mongoose.model('User', UserSchema);
