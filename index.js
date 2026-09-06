import express from "express";
import router from "./routes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log("Server started at port 3000");
});
