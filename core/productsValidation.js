const express = require('express')
const {body , param , query} = require('express-validator')

module.exports.addProdtuctValidator = [
    body("productName").isString().withMessage("product name is string ")
                        .isLength({max : 40}).withMessage("product name lenght not exced 40 chars") ,
    body("description").isString().withMessage("you need enter description of product and must be string") ,
    
    body("price").isNumeric({min:100}).withMessage("product price must exceed 100$") ,
    body("productImage").isString().withMessage("enter string path for image")

]


module.exports.editProductValidator = [
    body("_id").isInt().withMessage("enter product ID") ,
    body("productName").optional().isString().withMessage("product name is string ")
                       .isLength({max : 40}).withMessage("product name lenght not exced 40 chars") ,
    body("description").optional().isString().withMessage("you need enter description of product and must be string") ,
    
    body("price").optional().isInt({min:100}).withMessage("product price must exceed 100$") ,
    body("productImage").optional().isString().withMessage("enter string path for image")

]

module.exports.deleteProductValidator = [
    body("_id").isInt().withMessage("enter product ID") 
]

module.exports.getProductByIdValidator = [
    param("id").isInt().withMessage("The product id is integar")
]