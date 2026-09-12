import mongoose from "mongoose";
import { MONGODB_URL } from "../config/config.js";

export async function connectDb() {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message || error);
    console.warn(
      "⚠️ Tip: Make sure MongoDB is running locally (e.g. MongoDB service / Compass) or configure MONGODB_URL in .env to your MongoDB Atlas connection string."
    );
  }
}
