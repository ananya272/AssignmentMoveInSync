const express=require("express");
const router=express.Router();
const {registeruser,loginuser,userorders}=require("../Controllers/users.controllers");

router.post("/register",registeruser);
router.post("/login",loginuser);
router.get("/orders",userorders);

module.exports=router;