const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name : {type : String , require : true},
    title : {type : String , require : true},
    category : {type : String , require : true},
    picture : {type : Array} ,
    review : {type : Array} ,
    seller : {type : mongoose.Schema.Types.ObjectId , ref : "users"}
});

const productModel = mongoose.model('products' , productSchema);

module.exports = productModel;