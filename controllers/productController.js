const Product=require("../models/productModel")

//create Product for admin only
exports.createProduct = async(req,res,next)=>{
    const product =await Product.create(req.body)
    res.status(201).json({message:"stored sucessfully"})

}


//get products
exports.getAllproducts = async(req,res)=>{
    
    const product=await Product.find()
    res.status(200).json(product)
}

//update product for admin
exports.updateProduct=async(req,res)=>{
    let product= await Product.findById(req.params.id)
    if(!product){
        res.status(500).json({
            message:"your product is not found"
        })
    }
    let updated_document=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json({
        message:"updated sucessfully"
    })
}
exports.deleteProduct=async(req,res)=>{
    let product= await Product.findById(req.params.id)
    if(!product){
        res.status(500).json({
            message:"your product is not found"
        })
    }
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({
        message:"deleted sucessfully"
    })
}