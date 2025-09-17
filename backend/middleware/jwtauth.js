import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import userModel from "../models/user.js"
import dotenv from "dotenv";

dotenv.config();
const jwtmiddleware=async (req,res,next)=>{
    console.log(req.body);
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success:"false",message: "No token provided" });
    }
    try{
        const data=jwt.verify(token,process.env.Secret_Key)
        if(!data)return res.status(400).json({message:"failed"})
        const user=await userModel.findOne({_id:data.id});
        req.user=user
        next();
    }catch(err){
         res.status(401).json({success:"false",error:err});
    }
}

export const createtoken=(data)=>{
    return jwt.sign(data,process.env.Secret_Key);
}

export default jwtmiddleware;