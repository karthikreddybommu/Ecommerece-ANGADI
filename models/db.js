import mongoose from "mongoose";
import { MONGODB_URL } from "../config/config";

export async function connectDb() {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Connected to db");
  } catch (error) {
    console.log(error.message || error);
    process.exit(1);
  }
}
