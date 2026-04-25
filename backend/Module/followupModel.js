const mongoose = require('mongoose');
const {Schema} = require('mongoose')

const followupSchema = mongoose.Schema({
    enqid:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'StudentEnquiry'
    },
    uid:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    nextdate:{
        type:String
    },
    program:{
        type:String,
        required:true
    },
    status:{
        type:String,
        requried:true
    },
    remark:{
        type:String
    }
},{ timestamps:true
})

module.exports=mongoose.model('followup',followupSchema)