import {Router} from "express";
import { createProduct, deleteProduct, publishProduct, unpublishProduct, updateProduct } from "../controllers/productController";

const router = Router();

router.post("/",authenticate,authorize("ADMIN"),createProduct);
router.get("/",authenticate,getProducts);
router.get("/:id",authenticate,authorize("ADMIN"),updateProduct);
router.put("/:id",authenticate,authorize("ADMIN"),updateProduct);
router.delete("/:id",authenticate,authorize("ADMIN"),deleteProduct);
router.patch("/:id/publish",authenticate,authorize("ADMIN"),publishProduct);
router.patch("/:id/unpublish",authenticate,authorize("ADMIN"),unpublishProduct);

export default router;