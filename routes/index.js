import { Router } from "express";
import userRoutes from "./userRoutes";
import authRouter from "./authRoutes";
import productRouter from "./productRoutes";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.use("/user", authMiddleware, userRoutes);
router.use("/auth", authRouter);
router.use("/product", authMiddleware, productRouter);

export default router;
