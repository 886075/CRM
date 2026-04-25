const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    number:{
        type:String
    },
    password:{
        type:String,
        default:'1234'
    },
    role:{
        type:String,
        required:true
    },
    quali:{
        type:String
    },
    skill:{
        type:String
    },
    exp:{
        type:String
    },
    address:{
        type:String
    },
    profile:{
        type:String
    },
    center:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'u'
    },
    otp:String,
    otpExpire:Date,
    otpVerified:{
        type:Boolean,
        Default:false
    }
},{ timestamps:true
})

module.exports= mongoose.model('user',userSchema)