const express = require('express');
const visitorModel = require('../Module/visitorModel');
const visitorRoute = express.Router();

visitorRoute.get('/', async (req,res)=>{
    const user = await visitorModel.find();
    return res.json({'msg':'sucess', "vistor":user});
})

visitorRoute.post('/', async (req,res)=>{
     const user= req.body;
     await visitorModel.create(user);
    return res.json({"msg":"sucess"});
})

visitorRoute.get('/:id',async (req,res)=>{
    const id = req.params.id;
    const user=await visitorModel.findById(id);
    res.json({"vistor":"success","user":user});
})

visitorRoute.put('/:id',async (req,res)=>{
    const id = req.params.id;
    await visitorModel.findByIdAndUpdate(id,req.body);
    res.json({"msg":"Update"});
})
visitorRoute.delete('/:id',async (req,res)=>{
    const id = req.params.id;
    await visitorModel.findByIdAndDelete(id);
    res.json({"msg":"Delete"});
})




module.exports = visitorRoute;