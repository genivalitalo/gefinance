import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import transacRoutes from "./routes/transacRoutes.js"

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", authRoutes); // Rotas de autenticação
app.use("/", transacRoutes); 

export default app;
