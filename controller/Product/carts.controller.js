const cartModel = require('../../model/Product/cart.model');

const addToCart = async (request, response) => {
    try {
        const { product } = request.body;
        const cartData = await cartModel.findOne({ userId: request.user._id });
        if (cartData) {
            for (let i = 0; i < cartData.products.length; i++) {
                if (cartData.products[i].product == product) {
                    cartData.products[i].quantity++;
                    await cartData.save();
                    return response.status(200).json({ message: "data added sucessfull." });
                }
            }
            cartData.products = [...cartData.products, { product, quantity: 1 }];
            await cartData.save();
            return response.status(200).json({ message: "data added sucessfull" });
        }
        await cartModel.create({
            userId: request.user._id,
            products: [{ product, quantity: 1 }]
        });
        return response.status(200).json({ message: "data added sucessfull" });
    }
    catch (error) {
        return response.status(400).json({ message: "error" });
    }
};



const removeToCart = async (request, response) => {
    try {
        const { product } = request.body;
        const cartData = await cartModel.findOne({ userId: request.user._id });
        if (cartData) {
            let arr = [];
            for (let i = 0; i < cartData.products.length; i++) {
                if (cartData.products[i].product == product) {
                    continue;
                }
                arr.push(cartData.products[i]);
            }
            cartData.products = arr;
            await cartData.save();
            return response.status(200).json({ message: "data removed sucessfull" });
        }
    }
    catch (error) {
        return response.status(400).json(error);
    }
};

const removeQuantity = async (request, response) => {
    try {
        const { product } = request.body;
        const cartData = await cartModel.findOne({ userId: request.user._id });
        if (cartData) {
            for (let i = 0; i < cartData.products.length; i++) {
                if (cartData.products[i].product == product) {
                    cartData.products[i].quantity--;
                    if (cartData.products[i].quantity === 0) {
                        let arr = [];
                        for (let i = 0; i < cartData.products.length; i++) {
                            if (cartData.products[i].product == product) {
                                continue;
                            }
                            arr.push(cartData.products[i]);
                        }
                        cartData.products = arr;
                        await cartData.save();
                        return response.status(200).json({ message: "data minus sucessfull" });
                    }
                    await cartData.save();
                    return response.status(200).json({ message: "data minus sucessfull." });
                }
            }

        }
        return response.status(200).json({ message: "data not paresent" });
    }
    catch (error) {
        return response.status(400).json({ message: "error" });
    }
}

const getCartItem = async (request, response) => {
    try {
        const userId = request.user._id;
        const data = await cartModel.findOne({ userId }).populate({
            path: 'products.product',
            model: 'products'
        }).exec();
        return response.status(200).json(data);
    }
    catch (error) {
        return response.status(400).json(error);
    }
}

module.exports = { addToCart, removeToCart, getCartItem, removeQuantity };