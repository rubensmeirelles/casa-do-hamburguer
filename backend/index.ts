import express from "express";
import { connection } from "./src/db.js";
import { prisma } from "./src/db.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
connection();

app.post("/login", async(req, res) => {
  try {
    const {email, password} = req.body;

  if (!email || !password) {
    res.status(400).json({message: "E-mail e senha são obrigatórios!"});
    return;
  }

  const user = await prisma.user.findFirst({
    where: {
      email: email,
      password: password
    }
  });

  if (!user) {
    res.status(404).json({message: "Credenciais inválidas!"});
    return;
  }

  res.status(200).json({ user });
  }
  catch (error) {
    res.status(500).json({message: "Erro no servidor."});
    return;
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 - 2");
});
