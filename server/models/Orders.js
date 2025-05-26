const mongoose =require("mongoose");

const orderSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    bookId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book",
        required:true
    },
    orderDate:{
        type:Date,
        default:Date.now
    },
    status:{
        type:String,
        enum:["pending","shipped","delivered"],
        default:"pending"
    }
})

const Order=mongoose.model("Order",orderSchema);
 module.exports=Order;