const mongoose = require('mongoose')
const {Schema} = mongoose;

const productData = new Schema({
    id: {
        type:String
    },
    title: {
        type: String
    },
    brand: {
        type: String
    },
    rating:{
        type: Number
    },
    price: {
        type: Number
    },
    thumbnail: {
        type: String
    }
});
const Product = mongoose.model('Product',productData);
exports.Product = Product;