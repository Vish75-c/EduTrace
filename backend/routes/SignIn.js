import { Router } from "express";
import userModel from "../models/user.js";
import passport from "../middleware/auth.js";
import { createtoken } from "../middleware/jwtauth.js";
passport.initialize();
const authmiddleware=passport.authenticate('local',{session:false});
const SignIn=Router();

SignIn.post('/',authmiddleware,async (req,res)=>{
    try{
        console.log("visited");
        const user=await userModel.findOne({username:req.body.username});
        console.log(user);
         const payload={email:user.email,id:user._id};
        const token=createtoken(payload)
        console.log(token);
        res.cookie("token",token);
        res.status(200).json({success:"true",user});

    }catch(err){
        res.status(400).json({success:"false",message:"err"});
    }
})

export default SignIn;

