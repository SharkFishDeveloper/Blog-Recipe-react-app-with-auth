import express from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from "../models/User.js";
const router = express.Router();


router.post('/register', async(req,res)=>{
    const {email,password} = req.body;
    const user = await UserModel.findOne({email});
    let emailPattern = /\S+@\S+\.\S+/;
    if(user){
        return res.json({message:"User already exists"});
    }
    if (!emailPattern.test(email)) {
        return res.json({message:"Invalid email"});
    }
    if(password.length<6){
        return res.json({message:"Password is to small"})
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new UserModel({email,password:hashedPassword});
    await newUser.save();
    res.json({message:"User created successfully"});
});



router.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    const user = await UserModel.findOne({email});
    let emailPattern = /\S+@\S+\.\S+/;
    if(!user){
        return res.json({message:"User does not exist"});
    }
    if (!emailPattern.test(email)) { 
        return res.json({message:"Invalid email"});
    }
    const checkPassword = await bcrypt.compare(password,user.password);
    if(!checkPassword){
        return res.json({message:"Email or password is incorrect"});
    }
    const token = jwt.sign({id:user._id},"alphabetsecretkey");
     res.json({token, userId:user._id, message:"Login successfull"});
    // return res.json({message:"Login successfull"});


});
export {router as userRouter}