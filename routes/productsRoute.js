const express = require ('express')
const productsController = require('./../controllers/productsController')
const productsValidation = require('./../core/productsValidation')
const checkValidation = require('./../core/checkValidation')

const productsRouter = express.Router()

productsRouter.route("/products")
            .get( productsController.getAllProducts)
            .post(productsValidation.addProdtuctValidator , 
                   checkValidation ,
                   productsController.addNewProduct )
            .patch(productsValidation.editProductValidator , 
                checkValidation ,
                productsController.updateProduct)
            .delete(productsValidation.deleteProductValidator , 
                checkValidation ,
                productsController.deleteProduct)

productsRouter.route("/products/:id")
                .get(productsController.getProductByID)
                .delete(productsController.deleteProductByID)
module.exports = productsRouter