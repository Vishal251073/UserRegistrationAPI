const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoute = require('./api/Routes/user')
const bodyParser = require('body-parser');
mongoose.connect('mongodb+srv://Vishal_Das:Vishal9235@userauth.grfae.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mongoose.connection.on('error',(err)=>{
    console.log("Error!!");
});

mongoose.connection.on('connected',(connected)=>{
    console.log('Connected with database');
})
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/user',userRoute);


app.use((req,rest)=>{
    res.status(404).json({
        error:'Bad request'
    })
})
app.use((req,res)=>{
    res.status(200).json({
        message:'App is Running'
    })
})



module.exports = app;