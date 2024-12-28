import React, { useState } from "react";
import api from "../../services/api";
import style from "./style.module.css";
import InputPrimary from "../../components/InputPrimary";
import { LuMail } from "react-icons/lu";
import ButtonPrimary from "../../components/ButtonPrimary";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  // Estado inicial dos Inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Função que vai requisitar o cadastro do usuário
  const loginUsuario = async (e) => {
    e.preventDefault();

    // Vai iniciar
    try {
      const response = await api.post("/login", {
        email,
        password,
      });
      navigate('/dashboard')
    } catch (error) {
      console.log(
        "Error fazer login",
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
          <h2 className={style.h2Cadastro}>Login</h2>
          <p className={style.pCadastro}>
            Preencha os campos abaixo para acessar o sistema.
          </p>
        </div>
        <form className={style.containerForm} onSubmit={loginUsuario}>
          <div className={style.cardInput}>
            <label htmlFor="nome" className={style.labelStyle}>
              Email
            </label>
            <InputPrimary placeholder={"Digite seu email"} type={"email"} value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className={style.cardInput}>
            <label htmlFor="nome" className={style.labelStyle}>
              Senha
            </label>
            <InputPrimary placeholder={"Digite sua senha"} type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <ButtonPrimary nome={"Entrar"} type={"submit"} />
        </form>
      </div>
      <div className={style.containerContaCriada}>
        <p>Você não tem uma conta?</p>
        <a href="/cadastro_user">Criar conta</a>
      </div>
    </div>
  );
}
