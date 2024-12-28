import React, { useState } from "react";
import api from "../../services/api";
import style from "./style.module.css";
import InputPrimary from "../../components/InputPrimary";
import { LuMail } from "react-icons/lu";
import ButtonPrimary from "../../components/ButtonPrimary";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  // Estado inicial dos Inputs
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Função que vai requisitar o cadastro do usuário
  const cadastroUsuario = async (e) => {
    e.preventDefault();

    // Vai iniciar
    try {
      const response = await api.post("/cadastro", {
        nome,
        email,
        password,
      });
      navigate('/login')
    } catch (error) {
      console.log(
        "Error ao cadastrar usuário",
        error.response?.data || error.message
      );
      alert(error.response?.data.error || "Erro ao cadastrar usuário");
    }
  };
  return (
    <div className={style.container}>
      <div className={style.containerAllForm}>
        <h2 className={style.logo}>GeFinance</h2>
        <div className={style.containerInfoCadastro}>
          <h2 className={style.h2Cadastro}>Cadastre-se</h2>
          <p className={style.pCadastro}>
            Crie sua conta na melhor plaforma financeira pessoal.
          </p>
        </div>
        <form className={style.containerForm} onSubmit={cadastroUsuario}>
          <div className={style.cardInput}>
            <label htmlFor="nome" className={style.labelStyle}>
              Nome
            </label>
            <InputPrimary placeholder={"Digite seu nome"} type={"text"} value={nome} onChange={(e) => setNome(e.target.value)}/>
          </div>
          <div className={style.cardInput}>
            <label htmlFor="nome" className={style.labelStyle}>
              Email
            </label>
            <InputPrimary placeholder={"Digite seu melhor email"} type={"email"} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className={style.cardInput}>
            <label htmlFor="nome" className={style.labelStyle}>
              Senha
            </label>
            <InputPrimary placeholder={"Crie uma senha"} type={"password"} value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <ButtonPrimary nome={"Cadastrar"} type={"submit"} />
        </form>
      </div>
      <div className={style.containerContaCriada}>
        <p>Já tem uma conta?</p>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
