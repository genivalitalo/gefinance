import express from "express";
import {createTransacao, getTransacoes} from "../controllers/transacoesController.js"

const router = express.Router();

router.post("/transac", createTransacao);
router.get("/transac", getTransacoes);

export default router;