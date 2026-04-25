const express = require('express');
const userModel = require('../Module/userModel');
const stEnqModel = require('../Module/stEnqModel');
const upload = require('../Helper/upload')
const userRoute = express.Router();

userRoute.get('/', async (req,res)=>{
    const user = await userModel.find();
    return res.json({'msg':'sucess', "user":user});
})

userRoute.post('/', async (req,res)=>{
     const user= req.body;
     await userModel.create(user);
    return res.json({"msg":"sucess"});
})

userRoute.patch('/:id', upload.single("profilepic"), async (req, res) => {
    await userModel.findByIdAndUpdate(req.params.id, {
        profilepic: req.file.filename
    });

    res.json({ msg: "success" });
});

userRoute.get('/:id',async (req,res)=>{
    const id = req.params.id;
    const user=await userModel.findById(id);
    res.json({"msg":"success","user":user});
})

userRoute.put('/:id',async (req,res)=>{
    const id = req.params.id;
    await userModel.findByIdAndUpdate(id,req.body);
    res.json({"msg":"Update"});
})


userRoute.put('/:id/:st',async(req,res)=>{
    const {id,st}=req.params;
    const status = st =="u"?"b":"u";
    const user = await userModel.findByIdAndUpdate(id,{status});
    if(st=="u"){
        await stEnqModel.updateMany({assignto:user._id},{$set:{assignto:null}})
    }
    return res.json({"msg":"sucess"})

})

userRoute.delete('/:id',async (req,res)=>{
    const id = req.params.id;
    await userModel.findByIdAndDelete(id);
    res.json({"msg":"Delete"});
})




module.exports = userRoute;