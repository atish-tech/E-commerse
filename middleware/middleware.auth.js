const jwt = require('jsonwebtoken');
const userModel = require('../model/Auth/user.model');

const authMiddleware = async (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        request.user = await userModel.findById(decode.id).select('-password');

        if (request.user.isVerified === true && request.user.isSeller === true) {
            next();
        }
        else {
            throw error;
        }

    } catch (error) {
        response.status(400).json({ message: "User Not authorized" });
    }
}



module.exports = authMiddleware ;