import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prismaClient.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const cadastroUsuario = async (req, res) => {
  // Campos a serem cadastrados
  const { nome, email, idade, password } = req.body;

  // Vai tentar realizar o cadastro
  try {
    // Vai fazer a validação por email para saber se o usuário já está cadastrado
    const usuarioExistente = await prisma.user.findUnique({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: "Email já cadastrado!" });
    }
    // Vai encriptar a senha
    const senhaHash = await bcrypt.hash(password, 10);
    // Vai criar o usuário de fato
    const novoUsuario = await prisma.user.create({
      data: {
        nome,
        email,
        password: senhaHash,
      },
    });

    res
      .status(201)
      .json({ message: "Usuário cadastrado com sucesso", novoUsuario });
  } catch (error) {
    console.error("Erro ao cadastrar usuário", error);
    res.status(500).json({ message: "erro ao cadastrar usuário" });
  }
};

export const loginUsuario = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const usuario = await prisma.user.findUnique({ where: { email } });
      if (!usuario) {
        return res.status(400).json({ error: "Email ou senha inválidos" });
      }
  
      const senhaValida = await bcrypt.compare(password, usuario.password);
      if (!senhaValida) {
        return res.status(400).json({ error: "Email ou senha inválidos" });
      }
  
      const token = jwt.sign({ id: usuario.id }, JWT_SECRET, { expiresIn: "1h" });
      res.status(200).json({ message: "Login realizado com sucesso", token });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      res.status(500).json({ error: "Erro ao fazer login" });
    }
  };