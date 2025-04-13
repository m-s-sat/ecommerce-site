require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const productModel = require('./model/productModel');
const Product = productModel.Product;
const cartModel = require('./model/cartModel');
const Cart = cartModel.Cart;

const PORT = process.env.PORT;

const server = express();
server.use(cors());
server.use(express.json());

main().catch(err=>console.log(err));
async function main(){
    mongoose.connect(process.env.URL);
    console.log("mongodb connected");
}

server.get('/products',async(req,res)=>{
    const data = await Product.find();
    res.json(data);
});
server.get('/cart',async(req,res)=>{
    const data = await Cart.find();
    res.json(data);
});
server.post('/cart',(req,res)=>{
    const cartProduct = new Cart(req.body);
    cartProduct.save();
})
server.delete('/cart/:id',async(req,res)=>{
    await Cart.findOneAndDelete({id:req.params.id});
})
server.patch('/cart/:id',async(req,res)=>{
    await Cart.findOneAndUpdate({id:req.params.id},req.body);
})
server.listen(PORT,()=>{
    console.log(`server statrted on ${PORT} port`);
});