const { User, generateToken, hashPassword } = require('../models/Users');
const Order=require('../models/Orders');
const Book=require('../models/Books');

exports.registeruser = async (req, res) => {
    const { userName, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = new User({
        userName: userName,
        password: hashedPassword
    });
    await user.save();
    res.status(201).json({ message: "user created successfully", user });
}

exports.loginuser = async (req, res) => {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName: userName });
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await require('bcrypt').compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user);
    res.status(200).json({ message: "login successfully", token });
}

exports.userorders= async(req,res)=>{
  const userid=req.params.id;
  const orders= await Order.find({userId:userid}).populate('bookId');
  if(!orders){
      return res.status(404).json({message:"No orders found for this user"});
  }
    res.status(200).json(orders);
}