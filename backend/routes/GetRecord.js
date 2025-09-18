import { Router } from "express";
import mongoose from "mongoose";
import userModel from "../models/user.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"
dotenv.config();
const GetUserWithAttendance = Router();


GetUserWithAttendance.get("/", async (req, res) => {
  try {
    const token=req.cookies.token;
    const payload= jwt.verify(token,process.env.Secret_Key);
    console.log(payload);
    const userId=payload.id;
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ success: false, message: "Invalid userId format" });
    }

    const userWithAttendance = await userModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(userId.toString()) }
      },
      {
        $lookup: {
          from: "attendances",         
          localField: "_id",           
          foreignField: "userId",       
          as: "attendanceRecords"       
        }
      },
      {
        $project: {
          username: 1,
          email: 1,
          collegeid: 1,
          phonenumber: 1,
          attendanceRecords: 1
        }
      }
    ]);
    console.log(userWithAttendance[0]);
    if (!userWithAttendance.length) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user: userWithAttendance[0] });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default GetUserWithAttendance;
