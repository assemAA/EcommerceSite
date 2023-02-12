const express = require("express");
const mongoose = require("mongoose");
require("./../models/productsModel");

const ProductsSchema = mongoose.model("Products");

module.exports.getAllProducts = (request, respose, next) => {
  ProductsSchema.find({})
    .then((data) => respose.status(200).json({ data }))
    .catch((err) => next(err));
};

module.exports.addNewProduct = (request, respose, next) => {
  let productObject = new ProductsSchema({
    _id: new mongoose.Types.ObjectId(),
    productName: request.body.productName,
    description: request.body.description,
    price: request.body.price,
    productImage: request.body.productImage,
  });

  productObject
    .save()
    .then(() => respose.status(201).json({ data: "product is added" }))
    .catch((err) => next(err));
};

module.exports.updateProduct = (request, respose, next) => {
  ProductsSchema.updateOne(
    { prodID: request.body.prodID },
    {
      $set: request.body,
    }
  )
    .then(() => respose.status(200).json({data : "product is updated"}))
    .catch((err) => next(err));
};

module.exports.deleteProduct = (request, respose, next) => {
  ProductsSchema.deleteOne({prodID : request.body.prodID})
                .then(()=> respose.status(200).json({data : "product is deleted "}))
                .catch( err => next(err))
};

module.exports.getProductByID = (request , response , next) => {
    ProductsSchema.findOne({prodID : request.params.id})
                    .then(data => response.status(200).json({data}))
                    .catch(err => next(err))
}
module.exports.deleteProductByID = (request , response , next) => {
    ProductsSchema.deleteOne({prodID : request.params.id})
                    .then(data => response.status(200).json({data}))
                    .catch(err => next(err))
}