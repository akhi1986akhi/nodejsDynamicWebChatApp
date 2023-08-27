require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/dynamic-chat-app").then(()=>{
    console.log("Database Connceted");
})


const express = require('express');

const app = express();



const userRoute = require('./routes/userRoute');

app.use("/",userRoute);

app.listen(3000,(req,res)=>{
    console.log(`Server running on port:3000`);
})

