const mongoose = require('mongoose');
const {Schema} = mongoose;

const cartDetails = new Schema({
    id:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});
const Cart = mongoose.model('Cart',cartDetails);
exports.Cart = Cart;