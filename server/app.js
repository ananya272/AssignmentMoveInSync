const express=require("express");
const app=express();
const mongoose=require("mongoose");
const cors=require("cors");
const dotenv=require("dotenv");
const BooksRoutes = require("./Routes/books.routes");
const userRoutes = require("./Routes/users.routes");
const orderRoutes = require("./Routes/orders.routes");
dotenv.config();
app.use(cors());
const port= process.env.PORT || 5000;

const main=async()=>{
  await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to mongodb");

}
main().catch(err => console.log(err));


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
     res.send({"message":"server is wroking"});
})
app.use("/books",BooksRoutes);
app.use("/user",userRoutes);
app.use("/order",orderRoutes);

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})