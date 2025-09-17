import express from "express";
import { configDotenv } from "dotenv";
import db from "./db.js";
import SignUp from "./routes/SignUp.js";
import SignIn from "./routes/SignIn.js";
import cors from "cors";
import Protected from "./routes/Protected.js";
import cookieParser from "cookie-parser";
configDotenv();
const app=express();
const port=process.env.PORT;
app.use(cors({
    origin: "http://localhost:5173",
  credentials: true 
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/SignUp',SignUp);
app.use('/SignIn',SignIn)  
app.use('/Protected',Protected); 
app.get('/',(req,res)=>{
    res.send("Hello world");
})

app.listen(port,()=>{
    console.log("Server is running")
})