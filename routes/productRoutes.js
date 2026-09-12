import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  publishProduct,
  unpublishProduct,
} from "../controllers/productController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", authenticate, authorize("admin"), createProduct);
router.get("/", authenticate, getProducts);
router.get("/:id", authenticate, getProductById);
router.put("/:id", authenticate, authorize("admin"), updateProduct);
router.delete("/:id", authenticate, authorize("admin"), deleteProduct);
router.patch("/:id/publish", authenticate, authorize("admin"), publishProduct);
router.patch("/:id/unpublish", authenticate, authorize("admin"), unpublishProduct);

export default router;