const mongoose = require('mongoose');
const { type } = require('os');
const {isEmail}=require('validator');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,'please enter an email'],
        unique:[true,'that email is already registered'],
        lowercase:true,
        validate:[isEmail,'please enter a valid email']
    },
    password:{
        type:String,
        required:[true,'please enter a password'],
        minlength:[6,'minimum password length is 6 characters']
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
const User=mongoose.model('User',userSchema);
module.exports=User;
