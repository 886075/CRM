const express = require('express');
const followupModel = require('../Module/followupModel');
const followupRoute = express.Router();


followupRoute.get('/',async(req,res)=>{
    const followup = await followupModel.find().populate("enqid").populate("uid");
    return res.json({"msg":"sucess",followup})
});

followupRoute.post('/', async(req,res)=>{
    await followupModel.create(req.body);
    return res.json({"msg":"sucess"});
})

module.exports=followupRoute