const Person=require("../models/personModel")


exports.createPerson = async(req,res,next)=>{
    try{
        phoneno=req.body.phone
        foundperson=await Person.findOne({"phone":phoneno})
        if(foundperson){
            await Person.findOneAndUpdate({"phone":phoneno},{"name":req.body.name,"phone":phoneno},{new:true})
        }
        else{
            const person =await Person.create(req.body)
        }
    res.status(201).json({message:"stored sucessfully"})
    }
    catch(e){
        console.log(e)
    }

}



exports.getAllPersons = async(req,res)=>{
    const person=await Person.find()
    res.status(200).json({message:"showed sucessfully",person})
}


exports.updatePerson=async(req,res)=>{
    
    let phoneno=req.body.phone
    let person= await Person.findOne({"phone":phoneno})
    if(!person){
        res.status(500).json({
            message:"your person is not found"
        })
    }
    const newCartProduct = {
        productname: req.body.cartproducts[0].productname,
        productquantity: req.body.cartproducts[0].productquantity,
        price: req.body.cartproducts[0].price,
        image: req.body.cartproducts[0].image
      };

    

    person.cartproducts.push(newCartProduct);
    await person.save();
    res.status(200).json({
        message:"updated sucessfully"
    })
}

exports.giveCart=async(req,res)=>{
    
    let person=await Person.findOne({phone:req.query.phone})
    
    if(person){
        //console.log("yes")
        let cartitems=person.cartproducts
        res.status(200).json({cartproducts:cartitems})
    }
}



exports.checkout=async(req,res)=>{
    
    let phoneno=req.body.phone
    let orderedproducts=req.body.cartitems

    
    let person=await Person.findOneAndUpdate({"phone":phoneno},{"orderedproducts":orderedproducts,"price":req.body.price},{new:true})
    let person2=await Person.findOneAndUpdate({"phone":phoneno},{"cartproducts":[]},{new:true})
    res.status(200).json({"message":"sucessfully placed the order"})
}