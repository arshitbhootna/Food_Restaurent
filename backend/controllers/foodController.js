import foodModel from '../models/foodModels.js';
import fs from 'fs';

// add food items 
const addFood = async(req,res)=>{
    // let image_file_name = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        // image: image_file_name,
    })

    try{
        await food.save();
        res.json({sucess: true,message:"Food added"})
    }
    catch(error){
        console.log(error);
        res.json({sucess:false , message:"error"})
    }
}
// all food list 
const listFood = async(req,res)=>{
    try{

        const foods = await foodModel.find({});
        res.json(({success:true , data: foods}))
    }
    catch(error){
        console.log(error);
        res.json({success: false , message: "error"})
    }
}

export  {addFood,listFood};