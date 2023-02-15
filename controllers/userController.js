const express = require("express");
const mongoose = require("mongoose");
require("./../models/userModel")
const userSchema = mongoose.model("User");

module.exports.getUser = (request, respose, next)=>{
    console.log("get user function")
  userSchema.find({
            email : request.body.email ,
            password : request.body.password 
      })
  .then((data) => respose.status(200).json({ data }))
    .catch((err) => next(err));
}


module.exports.getUserByID = (request , response , next) => {
    console.log(request.params._id)
    userSchema.findOne({_id : request.params._id})
                    .then(data => response.status(200).json({data}))
                    .catch(err => next(err))
}


module.exports.addNewUser = (request, respose, next) => {
    let userObject = new userSchema({
        _id : new  mongoose.Types.ObjectId() ,
        userName : request.body.userName ,
        email : request.body.email ,
        password : request.body.password 
       
    });
   
    userObject
      .save()
      .then(() => respose.status(201).json({ data: "User is added" }))
      .catch((err) => next(err));
};


module.exports.updateUser = (request , response , next)=> {

      


    if (request.id == request.body._id ) {
        userSchema.updateOne({_id: request.body._id} ,
        {
            $set : request.body
        }).then (data => response.status(200).json({data : "user updated"}))
        .catch (err => next(error))    
    }
    else {
        let error = new Error ()
        error.status = 401 
        error.message = "The updated is not valid"
        next(error)
    }
    

    
}



module.exports.deleteUser = (request , response , next) => {
    userSchema.deleteOne ({_id : request.body._id})
                    .then( data => response.status(200).json("User deleted"))
                    .catch( err => next(err))
    
}