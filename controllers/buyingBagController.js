const express = require("express");
const mongoose = require("mongoose");
require("./../models/buyingBagModel");



const buyingBagSchema = mongoose.model("buyingBag");
const userSchema = mongoose.model("User");
const ProductsSchema = mongoose.model("Products");


module.exports.getBuyingBag = (request, response, next) => {


    /// findMany({userId : requset.id})
    console.log(request)
    buyingBagSchema.find({ userId : request.id})
        .populate({ path: "productId", select: { productName: 1, description: 1, price: 1, productImage: 1 , _id :1 } })
        .populate({ path: "userId", select: { _id: 0  } })
        .then((data) => {
            if (data == null) throw new Error("data not found");
            else response.status(200).json({ data });
        })
        .catch((err) => next(err));
};


module.exports.addBuyingBag = (request, response, next) => {
    buyingBagSchema.findOne({userId :request.id , productId : request.body.productId})
                    .then( data => {
                        if (data == null) {

                            userSchema.findOne({ _id: request.id })
                            .then((data) => {
                              if (data == null) {
                                throw new Error("user is not in database");
                              } else {
                            ProductsSchema.find({ _id: request.body.productId })
                                .then((pData) => {
                                    if (pData != null) {
                                        let buyingBagObject = new buyingBagSchema({
                                            _id: new mongoose.Types.ObjectId(),
                                            productId: request.body.productId,
                                            userId: request.id,
                                            quantity: request.body.quantity,
                                        });
                        
                                        buyingBagObject
                                            .save()
                                            .then((data) => response.status(201).json(data))
                                            .catch((err) => next(err));
                                        response.status(201).json({ data: "BuyingBag added" });
                                    } else {
                                        throw new Error("product is not in database ");
                                    }
                                })
                                .catch((err) => next(err));
                        }
                        })
                        .catch((err) => next(err));
                        }
                        else {
                            let err  = new Error("product in da bag ")
                            next(err)
                        }

                    })
                    .catch (err => next(err))

};



module.exports.updateBuyingBag = (request, response, next) => {

        buyingBagSchema.updateOne(
            { userId : request.id , _id : request.body._id },
            {
                $set: request.body,
            }
        )
            .then(() => response.status(200).json({ data: "BuyingBag is updated" }))
            .catch((err) => next(err));
    
   
};


module.exports.deleteBuyingBag = (request, response, next) => {

    if (request.id == request.id) {
        buyingBagSchema.deleteOne({ _id : request.body._id })
        .then(() => response.status(200).json({ data: "BuyingBag is deleted " }))
        .catch(err => next(err))
    }
    
};

