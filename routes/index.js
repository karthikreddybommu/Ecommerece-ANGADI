import { Router } from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import csvRoutes from "./csvRoutes.js";
import productRouter from "./productRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/products", csvRoutes);
router.use("/products", productRouter);

export default router;
