import { Router } from "express";
import multer from "multer";
import { importProducts, exportProducts } from "../controllers/csvController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.post("/import", authenticate, authorize("admin"), upload.single("file"), importProducts);
router.get("/export", authenticate, authorize("admin"), exportProducts);

export default router;
