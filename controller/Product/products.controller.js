const productModel = require("../../model/Product/product.model");
const cartModel = require("../../model/Product/cart.model");
// get all product
const getProduct = async (request, response) => {
    try {
        return response.status(200).json(await productModel.find());
    }
    catch (error) {
        return response.status(400).json(error);
    }
}

// get Single product
const getSingalProduct = async (request, response) => {
    try {
        const { productId } = await request.params;
        const productDetail = await productModel.findById(productId);

        const cartDetailOfUser = await cartModel.findOne({ userId: request.user._id });
        for(let i=0; i<cartDetailOfUser.products.length; i++){
            if(cartDetailOfUser.products[i].product == productId){
                productDetail.isAddedToCart = true;
            }
        }
        console.log(productDetail);
        return response.status(200).json({productDetail});
    }
    catch (error) {
        return response.status(400).json({ message: "data not found" });
    }
}

// add product
const addProduct = async (request, response) => {
    try {
        await productModel.create({ ...request.body, seller: request.user._id });
        return response.status(200).json({ message: "Product added sucessfull" });
    }
    catch (error) {
        return response.status(400).json(error);
    }
}

// update product
const updateProduct = async (request, response) => {
    try {
        const { id, name, title, picture, category } = request.body;
        await productModel.findByIdAndUpdate(id, { name, title, picture, category });
        return response.status(200).json({ message: "Product Updated sucessfull" });
    }
    catch (error) {
        return response.status(400).json(error);
    }
}

// delete product
const deleteProduct = async (request, response) => {
    try {
        await productModel.findByIdAndDelete(request.body.id);
        return response.status(200).json({ message: "Product Deleted sucessfull" });
    }
    catch (error) {
        return response.status(400).json(error);
    }
}


module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getSingalProduct
};
