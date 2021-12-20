const express = require('express');
const router = express.Router();
const User = require('../model/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/authverify');
router.get('/',(req,res)=>{
    User.find({},(err,doc)=>{
        if(!err)
        {
            // console.log("Got!!")
            res.status(200).json({
                Userdata:doc,
            })
        }
        else{
            res.status(500).json({
                error:err
            })
            // console.log(err);
        }
    })
})
router.get('/:id',(req,res,next)=>{
    // console.log(req.params.id);
    User.find({_id:req.params.id},(err,doc)=>{
        if(!err)
        {
            console.log("Got!!")
            res.status(200).json({
                Userdata:doc,
            })
        }
        else{
            res.status(500).json({
                error:err
            })
            console.log(err);
        }
    })
})
router.post('/signup',(req,res,next)=>{

    bcrypt.hash(req.body.pasword,10,(err,hash)=>{
        if(err)
        {
            return res.status(500).json({
                error:err
            });
        }
        else{
            const user = new User({
                _id: new mongoose.Types.ObjectId,
                name:req.body.name,
                email:req.body.email,
                phoneNumber:req.body.phoneNumber,
                city:req.body.city,
                pasword:hash,
                userType:req.body.userType,
            });        
            user.save().then((result)=>{
                // console.log("Done!!");
                res.status(200).json({
                    newUser:result
                })
            }).catch(err=>{
                // console.log(err);
                res.status(500).json({
                    error:err
                })
            })
        }
    })
    
    
})

//PUT Request

router.put('/:id',(req,res)=>{
    // console.log(req.params.id);
    User.findOneAndUpdate({_id:req.params.id},{
        $set:{
            name:req.body.name,
            email:req.body.email,
            phoneNumber:req.body.phoneNumber,
            city:req.body.city,
            pasword:String,
            userType:String,
        }
    },(err,doc)=>{
        if(!err)
        {
            // console.log("Done!!");
            res.status(200).json({
                Userdata:doc,
            })
        }
        else{
            res.status(500).json({
                error:err
            })
            // console.log(err);  
        }
    })
})
//delete
router.delete('/:id',(req,res)=>{
    User.findByIdAndDelete({_id:req.params.id},(err)=>{
        if(!err)
        {
            console.log("Done!!");
            res.status(200).json({
                status:"Deleted"
            })
        }
    })
})
///Login

router.post('/login',(req,res)=>{
    User.find({name:req.body.name},(err,docs)=>{
        if(!err)
        {
            // console.log(docs)
            if(docs.length < 1)
            {
                return res.status(401).json({
                    msg:"No Such Useer Found"
                })
            }
            
            docs.forEach(client=>{
                bcrypt.compare(req.body.pasword,client.pasword,(err,result)=>{
                    // console.log(client);
                    if(!err)
                    {
                        if(result)
                        {
                            // console.log("Gotcha");
                            const token = jwt.sign({
                                name:client.name,
                                userType:client.userType,
                                email:client.email,
                                phoneNumber:client.phoneNumber,
                            },'secret',{expiresIn:"24h"});
                            return res.status(200).json({
                                name:client.name,
                                userType:client.userType,
                                email:client.email,
                                phoneNumber:client.phoneNumber,
                                token:token,
                            })
                        }
                    }
                })
            })
            if(res.statusCode!==200)
            {
                return res.status(401).json({
                    msg:"Wrong Password Entered"
                })
            }
        }
        else{
            return res.status(500).json({
                err:err
            })
        }
    })
})
module.exports = router;