const express = require('express')
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-sequence')(mongoose)

const productSchema = new mongoose.Schema({
    _id : {type : Number} , 
    productName : {type : String , required : true } ,
    description : {type : String , required : true} , 
    price : {type : Number , required : true} , 
    productImage : {type : String , required : true} 
} , {_id : false})

productSchema.plugin(autoIncrement , {inc_field: '_id'})

mongoose.model("Products" ,  productSchema)