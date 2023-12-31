const host = "http://localhost:8000";
// const host = "https://e-commerse-2.vercel.app";

module.exports.registerRoute = `${host}/register`
module.exports.loginRoute = `${host}/login`
module.exports.otpRoute = `${host}/verify`;
module.exports.googleLoginRoute = `${host}/google/login`;
module.exports.forgoatRoute = `${host}/forgoat`;
module.exports.updatePasswordRoute = `${host}/update/password`;

module.exports.getAllProduct = `${host}/get/product`
module.exports.getSingleProduct = `${host}/get/product`

module.exports.getCartProduct = `${host}/get/cart/product`
module.exports.removeCartItem = `${host}/remove/product/cart`
module.exports.addItemToCart = `${host}/add/product/cart`
module.exports.minusQuantity = `${host}/remove/product/quantity/cart`


