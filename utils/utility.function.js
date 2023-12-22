const jwt = require('jsonwebtoken');

module.exports.newToken = (user) => {
    return jwt.sign({id : user._id},
        process.env.JWT_SECRET , {expiresIn : '30d'});
}
