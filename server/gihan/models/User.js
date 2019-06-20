//User Model
//Defines all the properties of User (Admin, Student, Lecturer) 

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({

    userType: {
        type: String,
        required : true
    },
    userId :{
        type : String,
        required : true
    },
    faculty :{
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
    nic: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    dob: {
        type: Date,
    },
    address1: {
        type: String,
    },
    address2: {
        type: String,
    },
    city: {
        type: String,
    },
    landline: {
        type: String,
    },
    mobile: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    profilePic :{
        type : String
    },
    confirmed : {
        type : Boolean,
        default : false
    }
});

module.exports = User = mongoose.model('User', UserSchema);
