const mongoose = require('mongoose')

const statusSchema = mongoose.Schema({
    "name":{
        type:String,
        required:true
    },
    "address":{
        type:String
    },
    "status":{
        type:String,
        required:true
    }
},{timestamp:true

})

module.exports= mongoose.model('center',statusSchema)