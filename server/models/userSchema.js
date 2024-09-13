const mongoose = require('mongoose')
const validator = require('validator')
const userSchema = new mongoose.Schema({
    fname : {
        type: String,
        required : true,
        trim: true
    },
    lname : {
        type: String,
        required : true,
        trim: true
    },
    email : {
        type: String,
        required : true,
        trim: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw Error("Not valid email");
            }
        }
    },
    mobile : {
        type: Number,
        required: true,
        unique: true,
        minlength: 10,
        maslength: 10
    },
    gender : {
        type: String,
        required : true
    },
    status : {
        type: String,
        required: true
    },
    profile : {
        type: String,
        required : true
    }
}, {timestamps: true})


const   users = new mongoose.model("user",userSchema)

module.exports  = users