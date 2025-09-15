import express from "express";
import { configDotenv } from "dotenv";
import db from "./db.js";

configDotenv();
const app=express();
const port=process.env.PORT;

app.get('/',(req,res)=>{
    res.send("Hello world");
})

app.listen(port,()=>{
    console.log("Server is running")
})