import { Router } from "express";
import attendance from "../models/attendance.js";

const StoreRecord = Router();

StoreRecord.post("/", async (req, res) => {
  try {
    const { userId, status, latitude, longitude } = req.body;

    if (!userId || !status) {
      return res.status(400).json({ success: false, message: "userId and status are required" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

   
    let record = await attendance.findOne({ userId, date: today });

    if (!record) {
     
      record = new attendance({ userId, status, latitude, longitude, date: today });
      await record.save();
    } else {
      
      if (record.status !== "Present" && status === "Present") {
        record.status = "Present";
        record.latitude = latitude;
        record.longitude = longitude;
        await record.save();
      }
    }

    res.status(200).json({ success: true, record });

  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default StoreRecord;
