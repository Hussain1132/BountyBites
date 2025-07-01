import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'


//user login 

const loginUser =async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await userModel.findOne({email})
        if(!user){
            res.json({success:false,message:"User doesn't exist"})
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"})
        }
        const token=createToken(user._id);
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

const createToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
//user register
const registerUser=async(req,res)=>{
    const {name,password,email}=req.body;
    try {
        // checking here if user is already registered
        const exist=await userModel.findOne({email})
        if(exist){
            return res.json({success:false,message:"User already exists"})
        }
        // now email & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"Please enter a strong password"})
        }
        // now hashing the password with bcrypt

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser=new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user=await newUser.save()
        const token=createToken(user._id)
        res.json({success:true,token})


    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}

export {loginUser,registerUser};