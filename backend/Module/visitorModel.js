const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  fullName:{
    type:String,
    required:true
  },
  contactNumber:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  purpose:{
    type:String,
    required:true
  },
  address:{
    type:String
  },
  remark:{
    type:String
  },
  role:{
    type:String,
  },
  center:{
    type:String,
  }
},{ timestamps:true

});

module.exports = mongoose.model('visitorEnquiry', visitorSchema);