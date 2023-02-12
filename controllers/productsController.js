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
    { _id: request.body._id },
    {
      $set: request.body,
    }
  )
    .then(() => respose.status(200).json({data : "product is updated"}))
    .catch((err) => next(err));
};

module.exports.deleteProduct = (request, respose, next) => {
  ProductsSchema.deleteOne({_id : request.body._id})
                .then(()=> respose.status(200).json({data : "product is deleted "}))
                .catch( err => next(err))
};

module.exports.getProductByID = (request , response , next) => {
    ProductsSchema.findOne({_id : request.params._id})
                    .then(data => response.status(200).json({data}))
                    .catch(err => next(err))
}
module.exports.deleteProductByID = (request , response , next) => {
    ProductsSchema.deleteOne({prodID : request.params.id})
                    .then(data => response.status(200).json({data}))
                    .catch(err => next(err))
}
