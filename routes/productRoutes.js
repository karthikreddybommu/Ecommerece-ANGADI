import {Router} from "express";
import { createProduct } from "../controllers/productController";

const router = Router();

router.post("/",authenticate,authorize("ADMIN"),createProduct)
router.get("/",authenticate,getProducts)
export default router;