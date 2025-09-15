import { Router } from "express";
import userModel from "../models/user.js";
import jwt from "jsonwebtoken";
import { createtoken } from "../middleware/jwtauth.js";
const SignUp=Router();

SignUp.post('/',async (req,res)=>{
    try{
        const data=req.body;
        const person=await userModel(data);
        const response=await person.save();
        
        const payload={
            email:data.email,
            id:response._id
        }
        const token=createtoken(payload);
        console.log(token);
        res.cookie("token",token);
        res.status(200).json({success:"true",response})
        
    }catch(err){
        res.status(500).json({success:"false",message:err});
    }
})
export default SignUp