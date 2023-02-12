const express = require('express')
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-sequence')(mongoose)

const productSchema = new mongoose.Schema({
    _id : {type : mongoose.Schema.Types.ObjectId} , 
    prodID : {type : Number} ,
    productName : {type : String , required : true } ,
    description : {type : String , required : true} , 
    price : {type : Number , required : true} , 
    productImage : {type : String , required : true} 
})

productSchema.plugin(autoIncrement , {inc_field: 'prodID'})

mongoose.model("Products" ,  productSchema)