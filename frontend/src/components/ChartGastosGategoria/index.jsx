import React from "react";
import styles from './styles.module.css';

export default function GastosPorCategoria() {
  const categorias = [
    { nome: "Moradia", porcentagem: 60, valor: "R$ 2.500" },
    { nome: "Alimentação", porcentagem: 20, valor: "R$ 1.200" },
    { nome: "Saúde", porcentagem: 30, valor: "R$ 320" },
    { nome: "Transporte", porcentagem: 20, valor: "R$ 150" },
  ];

  return (
    <div className={styles.containerChart}>
      <p className={styles.textChart}>Gastos por categoria</p>
      {categorias.map((categoria, index) => (
        <div key={index} style={{ marginBottom: "5px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#535862",
              marginBottom: "4px",
            }}
          >
            <span>{categoria.nome}</span>
            <span>{categoria.porcentagem}%</span>
          </div>
          <div
            style={{
              background: "#f0f0f0",
              borderRadius: "5px",
              height: "8px",
              position: "relative",
              overflow: "hidden", // Para garantir que a borda arredondada funcione bem
            }}
          >
            <div
              style={{
                background: "#9e77ed",
                width: `${categoria.porcentagem}%`,
                height: "100%",
                borderRadius: "5px",
                transition: "width 0.3s ease-in-out", // Transição suave
              }}
            ></div>
          </div>
          <div style={{ color: "#535862", marginTop: "5px" }}>{categoria.valor}</div>
        </div>
      ))}
    </div>
  );
}
