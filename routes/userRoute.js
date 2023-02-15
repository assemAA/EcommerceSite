const express = require ('express')
const userController = require('./../controllers/userController')
const checkValidation = require('./../core/checkValidation')
const userValidator = require('./../core/userValidation')
const authorization  = require("./../Core/Authorization/authorization");




const userRouter = express.Router();
userRouter.route("/users")
          .get( authorization.checkUser , userValidator.getUserDataValidator , checkValidation ,  userController.getUser)
          .post( userValidator.addUserValidator,checkValidation,userController.addNewUser)
          .patch(authorization.checkUser , userValidator.updateUserValidator,checkValidation,userController.updateUser)
          .delete( userValidator.deleteUserValidator,checkValidation,userController.deleteUser)
userRouter.route("/users/:id").get( userValidator.getUserByIdValidator,checkValidation, userController.getUserByID)
module.exports =userRouter