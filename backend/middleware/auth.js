import passport from "passport";
import userModel from "../models/user.js";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt"
import { createtoken } from "./jwtauth.js";
passport.use(new LocalStrategy(async (username,password,done)=>{
    try{
        const user=await userModel.findOne({username:username});
        if(!user)return done(null,false,{message:"User not found"})
        const isMatch=bcrypt.compare(user.password,password);
        if(isMatch){
            return done(null,user);
        }
    }catch(err){
        return done(null,false,{message:err});
    }
}))
export default passport;