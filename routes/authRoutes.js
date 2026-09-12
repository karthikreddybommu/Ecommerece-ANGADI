import { Router } from "express";
import { signup, login, signUp, signIn } from "../controllers/authController.js";

const router = Router();

router.post("/signup", signup);
router.post("/signin", login);
router.post("/login", login);

export default router;
