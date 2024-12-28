import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

export default function ChartCategoria() {
  const chartRef = useRef(null);

  useEffect(() => {
    const options = {
      chart: {
        type: "radialBar",
        height: 240,
      },
      series: [40, 70, 30], // Porcentagens de cada categoria
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
  }, []);

  return <div ref={chartRef} />;
}
