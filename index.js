import express from "express";
import cookieParser from "cookie-parser";

import router from "./routes/index.js";
import { connectDb } from "./models/db.js";
import { PORT } from "./config/config.js";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

// Swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// Home
app.get("/", (req, res) => {
  res.json({
    message: "Ecommerce ANGADI API is running successfully!"
  });
});

// API routes
app.use("/api/v1", router);

// Database
connectDb();

// Start server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});