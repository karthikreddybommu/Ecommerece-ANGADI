import mongoose from "mongoose";
import { MONGODB_URL } from "../config/config.js";

export async function connectDb() {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Connected MongoDB successfully");
  } catch (error) {
    console.error(" MongoDB Error:", error.message || error);
  }
}
