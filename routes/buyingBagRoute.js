const express = require ('express')
const buyingBagController = require('./../controllers/buyingBagController')
const buyingBagValidation = require('./../core/buyingBagValidation')
const checkValidation = require('./../core/checkValidation')
const autherizationMW = require('./../core/Authorization/authorization')
const buyingBagRouter = express.Router()

buyingBagRouter.route("/buyingBag")
            .all (autherizationMW.checkUser)
            .get(buyingBagValidation.getBuyingBagValidator,
                 checkValidation,
                 buyingBagController.getBuyingBag)

            .post(buyingBagValidation.addBuyingBagValidator, 
                   checkValidation ,
                   buyingBagController.addBuyingBag )

            .patch(buyingBagValidation.editBuyingBagValidator , 
                checkValidation ,
                buyingBagController.updateBuyingBag)

            .delete(buyingBagValidation.deleteBuyingBagValidator, 
                checkValidation ,
                buyingBagController.deleteBuyingBag)

module.exports = buyingBagRouter