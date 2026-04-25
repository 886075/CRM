const express = require('express');
const assignModel = require('../Module/assignModel');
const assignRoute = express.Router();

assignRoute.post('/',async(req,res)=>{
    await assignModel.create(req.body);
    return res.json({"msg":"success"})
})

assignRoute.get('/',async(req,res)=>{
    const assign = await assignModel.find();
    return res.json({"msg":"success",assign})
})


module.exports=assignRoute;