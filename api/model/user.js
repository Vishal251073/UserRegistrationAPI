const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    name:String,
    email:String,
    phoneNumber:Number,
    city:String,
    password:String,
    userType:String,
    
})

module.exports = mongoose.model('User',userSchema);