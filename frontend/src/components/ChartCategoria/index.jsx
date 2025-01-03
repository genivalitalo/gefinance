import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";
import api from "../../services/api";

export default function ChartCategoria() {
  const [transacoes, setTransacoes] = useState([]);
  const [totalReceita, setTotalReceita] = useState(0);
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [totalInvestimentos, setTotalInvestimentos] = useState(0);

  const chartRef = useRef(null);

  // Fetch transações do banco de dados
  useEffect(() => {
    const fetchTransacoes = async () => {
      try {
        const responseTransac = await api.get("/transac");
        console.log("Transações do banco:", responseTransac.data);
        setTransacoes(responseTransac.data);
      } catch (error) {
        console.log("Erro ao buscar transações", error.message);
      }
    };
    fetchTransacoes();
  }, []);

  // Calcular os totais de receitas, despesas e investimentos
  useEffect(() => {
    const calcularTotais = () => {
      const receitas = transacoes
        .filter((transacao) => transacao.tipo_transacao === "entrada")
        .reduce((soma, transacao) => soma + Number(transacao.valor), 0);

      const despesas = transacoes
        .filter((transacao) => transacao.tipo_transacao === "saida")
        .reduce((soma, transacao) => soma + Number(transacao.valor), 0);

      const investimentos = transacoes
        .filter((transacao) => transacao.tipo_transacao === "investimento")
        .reduce((soma, transacao) => soma + Number(transacao.valor), 0);

      setTotalReceita(receitas);
      setTotalDespesas(despesas);
      setTotalInvestimentos(investimentos);
    };

    calcularTotais();
  }, [transacoes]);

  // Atualizar o gráfico com os valores calculados
  useEffect(() => {
    const totalGeral = totalReceita + totalDespesas + totalInvestimentos;

    const porcentagens = totalGeral
      ? [
          ((totalInvestimentos / totalGeral) * 100).toFixed(2),
          ((totalReceita / totalGeral) * 100).toFixed(2),
          ((totalDespesas / totalGeral) * 100).toFixed(2),
        ]
      : [0, 0, 0];

    const options = {
      chart: {
        type: "radialBar",
        height: 240,
      },
      series: porcentagens, // Porcentagens calculadas
      plotOptions: {
        radialBar: {
          dataLabels: {
            showOn: "always",
            name: {
              show: true,
              color: "#888",
              fontSize: "13px",
            },
            value: {
              color: "#111",
              fontSize: "20px",
              show: true,
            },
          },
        },
      },
      stroke: {
        lineCap: "round",
      },
      labels: ["Investimentos", "Receita", "Despesas"], // Categorias
      colors: ["#9e77ed", "#55B02E", "#F6352E"], // Cores de cada categoria
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy(); // Limpa o gráfico ao desmontar o componente
    };
  }, [totalReceita, totalDespesas, totalInvestimentos]);

  return <div ref={chartRef} />;
}
