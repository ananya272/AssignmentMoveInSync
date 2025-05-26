const Book = require('../models/Books');
exports.ALLBooks= async (req,res)=>{
    const allbooks= await Book.find();
    res.status(200).json(allbooks);

}
exports.newBook= async(req,res)=>{
    const {title,subtitle,author,publishedDate,publisher,description,website}=req.body;
    const newBook= new Book({
        title,
        subtitle,
        author,
        publishedDate,
        publisher,
        description,
        website
    });
    await newBook.save();
    res.status(201).json( {"message":"createdsuccessfully",
        newBook
    

    } );
}
exports.getBook=async(req,res)=>{
    const id=req.params.id;
    const book= await Book.find({_id:id});;
    if(!book){
        return res.status(404).json({message:"Book not found"});
    }
    res.status(200).json(book);
}

exports.updateBook=async(req,res)=>{
    const id=req.params.id;
    const {title,subtitle,author,publishedDate,publisher,description,website}=req.body;
    const book= await Book.findByIdAndUpdate(id,{
        title,
        subtitle,
        author,
        publishedDate,
        publisher,
        description,
        website
    },{new:true});
    if(!book){
        return res.status(404).json({message:"Book not found"});
    }
    res.status(200).json({message:"Book updated successfully", book});
}
exports.deleteBook=async(req,res)=>{
    const id=req.params.id;
    const book= await Book.findByIdAndDelete(id);   
if(!book){
        return res.status(404).json({message:"Book not found"});
    }
    res.status(200).json({message:"Book deleted successfully"});
}