const express = require('express')
const {body , param , query} = require('express-validator')


module.exports.getUserDataValidator =  [

    body("email").isEmail().withMessage("email not valid") , 
    body("password").isStrongPassword().withMessage("password is in correct ")
]

module.exports.addUserValidator = [
    body("userName").isString().withMessage("User name must be string")
                    .isLength({max : 30}).withMessage("User name must be less than or equal 30 chars") ,
    body("password").isString().isLength({min : 8}).withMessage("password  must be string and strong") ,
    body("email").isEmail().isLength({max:30}).withMessage("User mail must be in email format"),
   
]

module.exports.updateUserValidator = [
    body("_id").isMongoId().withMessage("User id is must be entered") , 
    body("userName").optional().isString().withMessage("User name must be string")
                    .isLength({max : 30}).withMessage("User name must be less than or equal 30 chars") ,
    body("password").optional().isString().isLength({min : 8}).withMessage("password  must be string and strong") ,
    body("email").optional().isEmail().isLength({max:30}).withMessage("User mail must be in email format"),
   
]

module.exports.deleteUserValidator = [
    body("_id").isMongoId().withMessage("User id is must be entered") , 
]

module.exports.getUserByIdValidator = [
    param("id").isMongoId().withMessage("The User id is object")
]