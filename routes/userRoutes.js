import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deletedUser,
} from "../controllers/userController.js";
import { authentication, role } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authentication, role("admin"), getAllUsers);
router.get("/:id", authentication, role("admin"), getUserById);
router.put("/:id", authentication, role("admin"), updateUser);
router.delete("/:id", authentication, role("admin"), deletedUser);

export default router;
