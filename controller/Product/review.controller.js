// const productReviewModel = require('../../model/Product/product.review.model');

const productReviewModel = require("../../model/Product/product.review.model");

exports.productReview = async (request, response) => {
    try {
        await productReviewModel.create({ ...request.body , rating : request.body.rating , user : request.user._id });
        response.status(201).json({ message: "OK" });
    } catch (error) {
        response.status(400).json({ message: "faild" });
    }
}