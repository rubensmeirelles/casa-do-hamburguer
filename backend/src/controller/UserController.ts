import type { Request, Response } from "express";
import { prisma } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { decode } from "node:punycode";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "E-mail e senha são obrigatórios!" });
      return;
    }

    const user = await prisma.user.findFirst({
      where: { email: email },
    });

    if (!user) {
      res.status(404).json({ message: "Credenciais inválidas!" });
      return;
    }

    const match = await bcrypt.compare(password, user?.password);

    if (!match) {
      res.status(401).json({ message: "Usuário ou senha inválidos" });
      return;
    }

    const userInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
      cep: user.cep,
      admin: user.admin,
    };

    if (!process.env.JWT_SECRET) {
      return;
    }

    const token = jwt.sign(userInfo, process.env.JWT_SECRET);

    res.cookie("user", token, {
      maxAge: 600000,
    });

    res.status(200).json(userInfo);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor." });
    return;
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, cep } = req.body;

    if (!name || !email || !password || !cep) {
      res.status(400).json({
        message: "Todas as informações são obrigatórias",
      });
      return;
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.findFirst({
      where: { email: email },
    });

    if (user?.email) {
      res.status(409).json({ message: "E-mail já cadastrado" });
    }

    const newUser = await prisma.user.create({
      data: { name: name, email: email, password: hash, cep: cep },
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
    return;
  }
};

export const auth = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
    return;
  }
};

export const logout = async (req: Request, res: Response) => {
  const { user } = req.cookies;

  if (user) {
    res.clearCookie("user");
    res.json({ message: "Usuário deslogado" });
  }
  console.log(user);
};
