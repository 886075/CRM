const express = require('express');
const stEnqModel = require('../Module/stEnqModel');
const stEnqRouter = express.Router();


stEnqRouter.get('/', async (req,res)=>{
    const user = await stEnqModel.find().populate('assignto');
    return res.json({'msg':'sucess', "enq":user});
})

stEnqRouter.post('/', async (req,res)=>{
     const user= req.body;
     await stEnqModel.create(user);
    return res.json({"msg":"sucess"});
})

stEnqRouter.get('/:id',async (req,res)=>{
    const id = req.params.id;
    const user=await stEnqModel.findById(id);
    res.json({"msg":"success","user":user});
})

stEnqRouter.put('/:id',async (req,res)=>{
    const id = req.params.id;
    await stEnqModel.findByIdAndUpdate(id,req.body);
    res.json({"msg":"Update"});
})
stEnqRouter.delete('/:id',async (req,res)=>{
    const id = req.params.id;
    await stEnqModel.findByIdAndDelete(id);
    res.json({"msg":"Delete"});
})




module.exports = stEnqRouter;