const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    isSeller: {
        type: Boolean,
        default: false,
    },
    history: { type: Array },
}, { timestamps: true });

const userGoogle = mongoose.model('googleVerifiedUser', userSchema);

module.exports = userGoogle;