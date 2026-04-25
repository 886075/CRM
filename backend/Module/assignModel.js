const mongoose = require('mongoose');

const assignSchema = mongoose.Schema({
    enqid:{
        type:String,
        ref:'StudentEnquiry'
    },
    assignby:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:'assignbyModel'
    },
    assignbyModel:{
        type:String,
        email:['user','admin']
    },
    assignto:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    remark:{
        type:String
    },
    status:{
        type:String,
        defult:'u'
    }
    },{
        timestamps:true
})

module.exports = mongoose.model('assign',assignSchema)