import { Router } from "express";
import userModel from "../models/user.js";
import jwt from "jsonwebtoken";
import axios from "axios";
import { createtoken } from "../middleware/jwtauth.js";
const SignUp=Router();

SignUp.post('/', async (req, res) => {
  try {
    const data = req.body; 

    const { data: encodeResp } = await axios.post(
      "http://localhost:5001/encode",
      { image: data.faceImage }
    );

    // 2. Create user with faceEncoding
    const person = new userModel({
      ...data,
      faceEncoding: encodeResp.encoding
    });
    const response = await person.save();
    const payload = { email: data.email, id: response._id };
    const token = createtoken(payload);
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ success: true, response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});
export default SignUp