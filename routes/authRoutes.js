import { Router } from "express";
import { signup, login, logout, signUp, signIn } from "../controllers/authController.js";

const router = Router();

router.post("/signup", signup);
router.post("/signin", login);
router.post("/login", login);
router.post("/logout", logout);

export default router;
