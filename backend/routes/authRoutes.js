import express from "express";
import { cadastroUsuario, loginUsuario } from "../controllers/authController.js";

const router = express.Router();

router.post("/cadastro", cadastroUsuario);
router.post("/login", loginUsuario);

export default router;
