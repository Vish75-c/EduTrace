import mongoose from "mongoose";
import dotenv from "dotenv";  
                                              
dotenv.config();
const url=process.env.Local_Url;

mongoose.connect(url,{
    useNewUrlParser:true, 
    useUnifiedTopology:true
})

const db=mongoose.connection
db.on('connected',()=>{
    console.log("database is connected")  
})
db.on('disconnnected',()=>{
    console.log("database is disconnected")
})
db.on('error',(err)=>{
    console.log("error while connnection database")
})
export default db;