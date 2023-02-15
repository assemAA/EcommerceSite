const express = require('express')
const {body , param , query} = require('express-validator')

module.exports.addBuyingBagValidator = [
    // body("_id").isMongoId().withMessage("enter BuyingBag ID") ,
    body("productId").isInt().withMessage("productId is object ID") ,
    body("userId").isMongoId().withMessage("userId is object ID") ,
    body("quantity").isInt().withMessage("quantity is integar number ") ,

]

module.exports.editBuyingBagValidator = [
    //body("_id").isMongoId().withMessage("enter BuyingBag ID") ,
    body("productId").isInt().withMessage("productId is object ID") ,
    body("userId").isMongoId().withMessage("userId is object ID") ,
    body("quantity").isInt().withMessage("quantity is integar number ") ,

]

module.exports.deleteBuyingBagValidator = [
    body("userId").isMongoId().withMessage("userId is object ID") ,
    body("productId").isInt().withMessage("productId is object ID") ,
]

module.exports.getBuyingBagValidator = [
    body("userId").isMongoId().withMessage("userId is object ID") ,
    body("productId").isInt().withMessage("productId is object ID") ,
]
