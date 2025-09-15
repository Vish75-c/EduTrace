import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import userModel from "../models/user.js"
import dotenv from "dotenv";
dotenv.config();
const jwtmiddleware=async (req,res,next)=>{

}

export const createtoken=(data)=>{
    return jwt.sign(data,process.env.Secret_Key);
}

export default jwtmiddleware;