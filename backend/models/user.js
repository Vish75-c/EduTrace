import mongoose from "mongoose";
import bcrypt from "brcypt"
const userschema=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    collegeid:{type:Number,required:true,unique:true},
    phonenumber:{type:Number,required:true,unique:true},
    password:{type:String,required:true,unique:true},
    image:{type:String,rquired:true}
})


const userModel=mongoose.model("user",userschema);
export default userModel