import { Router } from "express";
import { login, register } from "./controller/UserController.js";

export const router = Router();

// Rotas de usuário
router.post("/login", login);
router.post("/register", register)
