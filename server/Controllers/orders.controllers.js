const order= require('../models/Orders');
const book= require('../models/Books');
const user= require('../models/Users');

exports.placeorder=async(req,res)=>{
    const {userId,bookId}=req.body;
    const neworder= new order({
        userId,
        bookId,
        orderDate: Date.now()
    });
    await neworder.save();
    res.status(201).json({message:"Order placed successfully",neworder});
}

exports.getorders=async(req,res)=>{
    const orders= await order.find().populate('userId').populate('bookId');
    res.status(200).json(orders);
}

exports.getorder=async(req,res)=>{
    const id=req.params.id;
    const order= await order.findById(id).populate('userId').populate('bookId');
    if(!order){
        return res.status(404).json({message:"Order not found"});
    }
    res.status(200).json(order);
}

