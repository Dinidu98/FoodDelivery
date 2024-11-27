import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'


//login
const loginUser=async(req,res)=>{
    const {email,password}=req.body;

    try{
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({success:'false',message:"user Doesn't exist"})
        }

        const isMatch=await bcrypt.compare(password,user.password) //match user entered paswrd and DB paswrd

        if(!isMatch){
            return res.json({success:'false',message:"Invalid Credentials"})
        }

        const token=createToken(user._id)
        res.json({success:"true",token})


    }catch(error){
        console.log(error)
        res.json({success:'false',message:"error login"})
    }

}


const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


//register
const registerUser=async(req,res)=>{
    const {name,password,email}=req.body;
    try{
        const exist=await userModel.findOne({email}) //check email exists and data store in exist var
        if(exist) {
            return res.json({success:false,message:"User Already Exist"})
        }

        //validating email format and password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Enter valid Email"})
        }

        if(password.length<8){
            return res.json({success:false,message:"Enter Strong password"})
        }

        //hashing password
        const salt=await bcrypt.genSalt(10) //5 to 15 level of encrypting 
        const hashedPassword=await bcrypt.hash(password,salt)

        const newUser=new userModel({
            name:name,
            email:email,
            password:hashedPassword,
        })

        const user=await newUser.save() //save data in DB
        const token=createToken(user._id)
        res.json({success:"true",token})


    }catch(error){
        console.log(error)
        res.json({success:'false',message:"error register"})

    }

}


export {loginUser,registerUser}