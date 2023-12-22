const mongoose = require('mongoose');

const productReviewSchema = mongoose.Schema({
    id : {
        type : String,
        // ref : 'product',
        default : "test",
        // require : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
        require : true
    },
    rating : {
        type : String,
    },
    message : {type : String},
});

const productReviewModel = mongoose.model('productReview' , productReviewSchema);
module.exports = productReviewModel;