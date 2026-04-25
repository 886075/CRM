const express = require('express');
const adminModel = require('../Module/adminModel');
const userModal = require('../Module/userModel');
const stEnqModel = require('../Module/stEnqModel');
const statusModel = require('../Module/statusModel');
const adminRoute = express.Router();



// adminRoute.post('/log',async(req,res)=>{
//     const {email,password} = req.body;
//     const user = await adminModel.findOne({email})
//     if(user){
//         if(user.password===password){
//             res.json({msg:'Sucess',user:user._id})
//         }
//         else{
//             res.json({msg:'password not found'})
//         }
//     }
//     else{
//         res.json({msg:'user not exist'})
//     }
// })


adminRoute.post('/log',async (req,res)=>{
    const {email,password}= req.body;
    const admin = await adminModel.findOne({email});

    if(admin){
        if(admin.password == password){
            res.json({msg:"success", role:"admin", id:admin._id, name:admin.name});
        }
        else{
            res.json({msg:"Password Not Match"})
        }
    }

    else{
        const user = await userModal.findOne({email}) ;
        if(user){
      
            if(user.password == password){
                if(user.status!="u"){
                   return res.json({msg:"Your Account Is Blocked"});
                }

                    res.json({msg:"success", role: user.role, id:user._id, name:user.name});
            }
            else{
                res.json({msg:"Password Not Match"})
            }
         }   

        else{
            res.json({"msg":"User Not found"});
        }
    }
})


adminRoute.get('/stats',async (req,res)=>{
    const enq = await stEnqModel.find();
    const user = await userModal.find();
    const center = await statusModel.find();

    res.json({"msg":"sucess","enq":enq.length,"user":user.length,"center":center.length})
})



module.exports=adminRoute
