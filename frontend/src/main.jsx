import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageCadastroUser from "./pages/cadastro_user";
import PageLogin from "./pages/login";
import PageDashboard from "./pages/dashboard";
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastro_user" element={<PageCadastroUser />} />
        <Route path="/login" element={<PageLogin />} />
        <Route path="/dashboard" element={<PageDashboard />} />
        <Route path="*" element={<h1>Página não encontrada</h1>} /> {/* Rota para 404 */}
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
