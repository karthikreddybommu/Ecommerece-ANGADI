import { Router } from "express";
import userRoutes from "./userRoutes";

import productRouter from "./productRoutes";


const router = Router();

router.use("/user", userRoutes);
router.use("/products", productRouter)

export default router;
