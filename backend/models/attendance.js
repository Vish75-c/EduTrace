import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: {
    type: Date,
    required: true,
    unique:true,
    default: () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // strip time → only date remains
      return today;
    },
  },
  status: { type: String, enum: ["Present", "Absent", "Late","absent","present"], required: true },
  latitude: { type: Number },
  longitude: { type: Number },
});

const attendance = mongoose.model("attendance", attendanceSchema);
export default attendance;
