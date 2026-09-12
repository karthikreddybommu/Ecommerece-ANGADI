import { Router } from "express";
import userRoutes from "./userRoutes";
<<<<<<< HEAD
=======
import productRouter from "./productRoutes";

>>>>>>> karthik

const router = Router();

router.use("/user", userRoutes);
<<<<<<< HEAD
=======
router.use("/products", productRouter)
>>>>>>> karthik

export default router;
