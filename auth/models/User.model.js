const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, unique: false },
    password: { type: String, required: true },
    role: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Role", 
      required: true, 
      default: new mongoose.Types.ObjectId("67a79adb2444ca132a82900e") 
    },
    status: { 
      type: String, 
      enum: ["pending", "active"], 
      default: "pending"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    verificationLink: String, 
    verificationExpire: { type: Date, expires: '20m' },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
