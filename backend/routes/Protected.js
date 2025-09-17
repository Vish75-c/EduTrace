import jwtmiddleware from "../middleware/jwtauth.js";
import userModel from "../models/user.js";
import { Router } from "express";

const Protected=Router();
Protected.get('/',jwtmiddleware,async (req,res)=>{
    console.log("visited");
    try{
        res.status(200).json({success:"true",user:req.user})
    }catch(err){
        res.status(400).json({success:"false"});
    }
})
export default Protected;
