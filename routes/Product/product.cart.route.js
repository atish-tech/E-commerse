const { addToCart, removeToCart, getCartItem, removeQuantity } = require('../../controller/Product/carts.controller');
const userMiddleware = require('../../middleware/userMiddleware');

const route = require('express').Router();

route.get('/get/cart/product' , userMiddleware , getCartItem);
route.post('/add/product/cart' , userMiddleware , addToCart);
route.post('/remove/product/quantity/cart' , userMiddleware , removeQuantity);
route.post('/remove/product/cart' , userMiddleware , removeToCart);


module.exports = route;