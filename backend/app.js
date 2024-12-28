import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", authRoutes); // Rotas de autenticação

export default app;
