const express = require('express');
const otprouter = express.Router();
const nodemailer = require('nodemailer');
const userModel = require('../Module/userModel');

const tp = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"ajayashutosh0@gmail.com",
        pass:"upzf mlbj cacq bqgp"
    }
});




otprouter.post('/send_otp', async(req,res)=>{
    try{
      const {email} = req.body;

    const user = await userModel.findOne({email});
    if(!user){
        return res.json({"msg":"user not find"})
    }

    // for otp send
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpire = Date.now() + (5*60*1000);
    user.otpVerified = false;

    await user.save();


    await tp.sendMail({
        from:"ajayashutosh0@gmail.com",
        to:email,
        subject:"OTP Verification",
        text : `Your OTP is ${otp}`
    })


    res.json({"msg":"success"})  
    }
    catch(error){
        return res.json({"msg":"OTP not send","error":error})
    }
})


otprouter.post('/verify_otp',async(req,res)=>{
    const {email,otp} = req.body;
    const user = await userModel.findOne({email});

    if(!user){
        return res.json({"msg":"User Not Found"});
    }

    if(user.otp != otp){
        return res.json({"msg":"OTP Not Match"})
    }

    if(user.otpExpire < Date.now()){
        return res.json({"msg":"OTP Expire"})
    }

    user.otpVerified = true;
    user.save();
    res.json({"msg":"success"});
})


otprouter.post('/create_pass',async(req,res)=>{
    const {email,cpass} = req.body;
    const user = await userModel.findOne({email});

    if(!user.otpVerified){
        return res.json({"msg":"Not Verified"})
    }
    user.password = cpass;
    user.save();
    return res.json({"msg":"success"});
    
})

module.exports = otprouter;