const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const generateToken = (user) => {
    return jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
}
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}


const User=mongoose.model("User",userSchema);
module.exports={User,generateToken,hashPassword};