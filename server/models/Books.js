const mongoose=require("mongoose");
const { type } = require("os");

const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    subtitle:{
        type:String
    },
    author:{
        type:String,
        required:true
    },
    publishedDate:{
        type:Date
    },
    publisher:{
        type:String
    },
    description:{
        type:String
    },
    website:{
        type:String
    }
})

const Book=mongoose.model("Book",bookSchema);

module.exports=Book;