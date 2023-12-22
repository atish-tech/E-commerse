const productModel = require("../../model/Product/product.model");

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
        return response.status(200).json(await productModel.findById(productId));
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
