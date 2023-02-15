
const express = require('express')
const mongoose= require('mongoose')

const userSchema= new mongoose.Schema({
    _id:{type : mongoose.Schema.Types.ObjectId },
    userName: {type : String , required : true} , 
    email : {type : String , required : true ,match :  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/} , 
    password : {type : String , required : true} 
})
mongoose.model("User",userSchema)