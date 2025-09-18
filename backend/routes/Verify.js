import express from "express";
import axios from "axios";
import { getDistance } from "geolib";
import userModel from "../models/user.js";

const verify = express.Router();


const COLLEGE_COORDS = { latitude: 28.480, longitude: 77.518394 }; //28.480755
const RADIUS_METERS = 100; // 100-meter allowed radius

verify.post("/", async (req, res) => {
  try {
    const { email, image, latitude, longitude } = req.body;

    // 1. Find user
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ verified: false, reason: "User not found" });

    // 2. Face encoding via Python service
    const { data: encodeResp } = await axios.post("http://127.0.0.1:5001/encode", { image });
    if (!encodeResp.encoding) {
      return res.status(400).json({ verified: false, reason: "No face detected" });
    }

    // 3. Compare encodings
    const stored = user.faceEncoding;
    const fresh = encodeResp.encoding;
    const distance = Math.sqrt(
      stored.reduce((acc, val, i) => acc + Math.pow(val - fresh[i], 2), 0)
    );
    const faceMatch = distance < 0.6;

    // 4. Location check
    const distMeters = getDistance(
      { latitude, longitude },
      { latitude: COLLEGE_COORDS.latitude, longitude: COLLEGE_COORDS.longitude }
    );
    const inRadius = distMeters <= RADIUS_METERS;

    // 5. Final decision
    if (faceMatch && inRadius) {
      return res.json({ verified: true });
    } else {
      return res.json({
        verified: false,
        reason: !faceMatch
          ? "Face does not match"
          : `Outside allowed area (${distMeters.toFixed(1)} m away)`,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ verified: false, reason: err.message });
  }
});

export default verify;
