const express=require("express");
const router=express.Router();
const {ALLBooks,newBook,getBook,updateBook,deleteBook}=require("../Controllers/books.controllers");

router.get("/allBooks",ALLBooks);
router.post("/newBook",newBook);
router.get("/:id",getBook);
router.put("/updatebook/:id",updateBook);
router.delete("/deletebook/:id",deleteBook);

module.exports=router;