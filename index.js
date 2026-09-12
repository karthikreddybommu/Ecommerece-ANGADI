import express from "express";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";
import { connectDb } from "./models/db.js";
import { PORT } from "./config/config.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Ecommerce ANGADI API is running successfully!" });
});

app.use("/api/v1", router);

connectDb();

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
