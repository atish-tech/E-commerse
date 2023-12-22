const express = require('express');
const authMiddleware = require('../../middleware/middleware.auth');
const { productReview } = require('../../controller/Product/review.controller');
const router = express.Router();

router.post('/product/review' , authMiddleware , productReview)

module.exports = router;