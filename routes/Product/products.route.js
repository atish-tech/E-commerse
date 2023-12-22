const { addProduct, updateProduct, deleteProduct, getProduct, getSingalProduct } = require('../../controller/Product/products.controller');
const authMiddleware = require('../../middleware/middleware.auth');

const route = require('express').Router();

route.get('/get/product' , getProduct);
route.get('/get/product/:productId' , getSingalProduct);

route.post('/add/product' , authMiddleware , addProduct);
route.post('/update/product' , authMiddleware , updateProduct);
route.post('/delete/product' , authMiddleware , deleteProduct);


module.exports = route;