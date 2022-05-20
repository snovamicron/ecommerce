const mongoose = require('mongoose')
const validator = require('validator')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please enter your name'],
        minlength:[5,'Name should have more then 4 characters'],
        maxlength:[30, 'Name can not exceed 30 characters']
    },
    email:{
        type: String,
        required:[true, 'Please enter your email'],
        unique:true,
        validate:[validator.isEmail,'Please enter a valid mail']
    },
    password:{
        type: String,
        required:[true, 'Please enter a password'],
        minlength:[8, 'Password should have more then 8 characters'],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:'User'
    },
    resetPasswordToken:String,
    resetPasswordExpire:String,
},{ timestamps: true})


module.exports = mongoose.model('users', userSchema)