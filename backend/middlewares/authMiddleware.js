import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const autenticarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token não fornecido" });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.usuarioId = payload.id;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Token inválido ou expirado" });
  }
};
