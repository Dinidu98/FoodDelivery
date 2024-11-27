import foodModal from '../models/foodModel.js'
import fs from 'fs'


//Add Food Items
const addFood=async(req,res)=>{
    let image_filename=`${req.file.filename}` //store uploaded file name in image_filename variable
    const food=new foodModal({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename,
    })
    try{
        await food.save(); //save in database
        res.json({success:true,message:"Food Added"})
    }catch(error){
        console.log(error)
        res.json({success:false,message:"Error adding food"})
    }
}

//All food list
const listFood=async(req,res)=>{
    try{
        const foods=await foodModal.find({});
        res.json({success:true,data:foods})
    }catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})

    }
}

//remove food item

const removeFood=async(req,res)=>{
    try{
        const food=await foodModal.findById(req.body.id) //relevant food item store in food variable
        fs.unlink(`uploads/${food.image}`,()=>{})//delete image from upload folder
        await foodModal.findByIdAndDelete(req.body.id) //delete data from database
        res.json({success:true,message:"Food removed"})
    }catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}




export {addFood,listFood,removeFood}
