const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const stEnqRouter = require('./Routes/stEnqRouter');
const adminRoute = require('./Routes/adminRoute');
const centerRoute = require('./Routes/centerRoute');
const visitorRoute = require('./Routes/visitorRoute');
const userRoute = require('./Routes/userRoute');
const assignRoute = require('./Routes/assignRoute');
const followupRoute = require('./Routes/followupRoute');
const otprouter = require('./Routes/otpRouter');
require('dotenv').config();

const app = express();

//
const port = process.env.PORT || 5000;
const MONGOURL=process.env.MONGOURL;

mongoose.connect(MONGOURL)
.then(()=>{
    console.log("connected to mongo db");
})
.catch((e)=>{
    console.log(`Error : ${e}`);
})

app.use(cors());
app.use(express.json());
app.use('/api/admin',adminRoute);
app.use('/api/enq', stEnqRouter);
app.use('/api/center',centerRoute);
app.use('/api/visitor',visitorRoute);
app.use('/api/users',userRoute);
app.use('/api/assign',assignRoute);
app.use('/api/followup',followupRoute);
app.use('/uploads', express.static('uploads'));

app.use('/api/otp',otprouter)







app.listen(port,()=>console.log(`Server Running on ${port}`));