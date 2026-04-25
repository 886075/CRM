const express = require('express');
const statusModel = require('../Module/statusModel');
const userModel = require('../Module/userModel');
const stEnqModel=require('../Module/stEnqModel')
const centerRoute = express.Router();


centerRoute.get('/', async (req,res)=>{
    const center = await statusModel.find();
    return res.json({'msg':'sucess', "center":center});
})

centerRoute.post('/', async(req,res)=>{
    await statusModel.create(req.body);
    return res.json({'msg':'sucess'})
})

centerRoute.get('/:id',async(req,res)=>{
    const id = req.params.id;
    const center = await statusModel.findById(id);
    return res.json({'msg':'sucess','center':center})
})

centerRoute.put('/:id',async(req,res)=>{
    const id = req.params.id;
    const center = await statusModel.findByIdAndUpdate(id);
    return res.json({'mdg':'sucess','center':center});
})
centerRoute.delete('/:id',async(req,res)=>{
    const id = req.params.id;
    const center = await statusModel.findByIdAndDelete(id);
    return res.json({'msg':'sucess','center':center})
})

centerRoute.put('/:id/:st',async(req,res)=>{
    // console.log(req.params)
    let {id,st} = req.params;
    let status = st =="Active" ? "Deactive" : "Active";
    let ust = st=="Active"?"b":"u";
    let est = st =="Active"?"b":"u";
    const center = await statusModel.findByIdAndUpdate(id,{status});
        await userModel.updateMany({center:center.name},{$set:{status:ust}});
        await stEnqModel.updateMany({center:center.name},{$set:{status:est}})
    return res.json({"msg":"sucess"})
})  

module.exports=centerRoute;
