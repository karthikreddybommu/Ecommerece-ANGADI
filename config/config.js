import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 3000;

export const MONGODB_URL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/ecommerce-angadi";

export const JWT_SECRET = process.env.JWT_SECRET || "angadi_ecommerce_secret_key_12345";

