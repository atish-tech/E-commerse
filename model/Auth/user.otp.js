const mongoose = require('mongoose')

const userOtpSchema = new mongoose.Schema({
    id : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'users'
    },
    email : {type : String},
    otp : {type : String},
});

const userOtp = mongoose.model('userOtp' , userOtpSchema);
module.exports = userOtp;