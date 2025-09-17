import mongoose from "mongoose";
import bcrypt from "bcrypt"
const userschema=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    collegeid:{type:Number,required:true,unique:true},
    phonenumber:{type:Number,required:true,unique:true},
    password:{type:String,required:true,unique:true},
    faceImage:{type:String,rquired:true},
    faceEncoding: { type: [Number] }
})
userschema.pre('save',async function(next){
    const person=this;
    if(person.password.isModified)return next();
    try{
        const password=person.password
        const salt=await bcrypt.genSalt(10);
        const hashpass=await bcrypt.hash(password,salt);
        person.password=hashpass
        next();
    }catch(err){
        return next(err);
    }
})

const userModel=mongoose.model("user",userschema);
export default userModel