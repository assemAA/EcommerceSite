const express = require ('express')
const productsController = require('./../controllers/productsController')
const productsValidation = require('./../core/productsValidation')
const checkValidation = require('./../core/checkValidation')
const autherization = require('./../core/Authorization/authorization')

const productsRouter = express.Router()

productsRouter.route("/products")
            .get(productsController.getAllProducts)
            .post(productsValidation.addProdtuctValidator , 
                   checkValidation ,
                   productsController.addNewProduct )
            .patch(autherization.checkAdmin , productsValidation.editProductValidator , 
                checkValidation ,
                productsController.updateProduct)
            .delete(autherization.checkAdmin , productsValidation.deleteProductValidator , 
                checkValidation ,
                productsController.deleteProduct)

productsRouter.route("/products/:id")
                .all(autherization.checkAdmin)
                .get( productsValidation.getProductByIdValidator, productsController.getProductByID)
                .delete(productsController.deleteProductByID)
module.exports = productsRouter