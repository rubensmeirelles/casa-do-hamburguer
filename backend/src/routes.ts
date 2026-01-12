import { Router } from "express";
import { auth, login, logout, register } from "./controller/UserController.js";
import { authMiddleware } from "./middlewares/auth.js";

export const router = Router();

// Rotas de usuário
router.post("/login", login);
router.post("/register", register)
router.get("/me", authMiddleware, auth)
router.post("/logout", authMiddleware, logout)
