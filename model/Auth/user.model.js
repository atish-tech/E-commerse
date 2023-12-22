const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    image: { type: String },
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isSeller: {
        type: Boolean,
        default: false,
    },
    isAuthGoogle: {
        type: Boolean,
        default: false,
    },
    history: { type: Array },
    favorites: { type: Array },

}, { timestamps: true });

// match user password with data base
// userSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

const user = mongoose.model('e-commerse-users', userSchema);
module.exports = user;