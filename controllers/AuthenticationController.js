const jwt= require("jsonwebtoken");
const express = require('express')
const mongoose = require("mongoose");

const usersSchema = mongoose.model("User");


module.exports.authenticationLogin=(request,response,next)=>{
 
   
    console.log(request)
 
    //admin
    if(request.body.userName=="admin" && request.body.password=="000"){
        
        //sign(yourOwnDataObject,secretkey,optionsYouMakeOnToken)
        let token = jwt.sign({
            role:"admin",
            id:1,
            userName:"admin",
            password:"000"
        },process.env.SECRETKEY,{expiresIn:"1h"});
        response.status(200).json({data:"login as admin",token})
    }
    else 
    {
        console.log("user authenticated") // 
        usersSchema.findOne({ email : request.body.email , password : request.body.password})
            .then(data=>{
                
            if(data == null){
                console.log("data is null ")
                let error = new Error ("Not Authenticated");
                error.status = 401 ;
                throw error;
            }
            else {
                console.log("token for user")
                let token = jwt.sign({
                    role:"user",
                    id:data._id,
                    email:data.email,
                },process.env.SECRETKEY,{expiresIn:"1h"});
                response.status(200).json({data:"login as a normal user",token})

            }

            })
        .catch(error=>{
            error = new Error ("");
            error.status = 401 ;
            next(error);
            })
     
    }
    
}