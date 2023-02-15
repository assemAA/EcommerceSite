const express = require('express')
const mongoose = require('mongoose')



const buyingBagSchema = new mongoose.Schema({
    _id : { type: mongoose.Schema.Types.ObjectId} , 
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productId: {
    type: Number,
    ref: 'Products',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
}
)

mongoose.model("buyingBag" ,  buyingBagSchema)




// {
// "  _id":"507f1f77bcf86cd799439011",
// "productId":1,
// "quantity":2

// }
