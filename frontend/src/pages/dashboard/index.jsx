import { useState } from "react";
import styles from "./style.module.css"; // Nome do objeto ajustado
import Header from "../../components/Header";
import ButtonPrimary from "../../components/ButtonPrimary";
import {
  LuWalletMinimal,
  LuEye,
  LuHandCoins,
  LuTrendingUp,
  LuTrendingDown,
  LuCreditCard,
} from "react-icons/lu";
import ChartCategoria from "../../components/ChartCategoria";
import { FaCircle } from "react-icons/fa";
import { BsXDiamond } from "react-icons/bs";
import ItemTransacao from "../../components/ItemTransacao";
import GastosPorCategoria from "../../components/ChartGastosGategoria";

export default function App() {
  const transacao = [
    {
      nome: "Academia",
      data: "28 Dez, 2024",
      valor: "100",
      icon: LuCreditCard,
    },
    {
      nome: "Mercado",
      data: "28 Dez, 2024",
      valor: "500",
      icon: LuCreditCard,
    },
    {
      nome: "Aluguel",
      data: "28 Dez, 2024",
      valor: "350",
      icon: BsXDiamond,
    },
    {
      nome: "Alimentação",
      data: "28 Dez, 2024",
      valor: "550",
      icon: BsXDiamond,
    },
    {
      nome: "Bitcoin",
      data: "28 Dez, 2024",
      valor: "150",
      icon: BsXDiamond,
    },
  ];
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.containerDashboard}>
        <div className={styles.chartSaldo}>
          <div className={styles.headerChartSaldo}>
            <div className={styles.containerIconeChart}>
              <LuWalletMinimal size={20} />
            </div>
            <p className={styles.nomeChart}>Saldo</p>
          </div>
          <div className={styles.infoValueChart}>
            <div className={styles.valueChartSaldo}>
              <h2 className={styles.valuesCharts}>R$ 2.700</h2>
              <button className={styles.buttonHidenValues}>
                <LuEye size={20} />
              </button>
            </div>
            <ButtonPrimary nome={"+ Adicionar Transação"} />
          </div>
        </div>
        <div className={styles.chartTransacoes}>
          <div className={styles.headerChartTransacao1}>
            <p className={styles.nomeChart}>Transações</p>
            <a href="/transacao" className={styles.linkRedirec}>
              Ver mais
            </a>
          </div>
          <div className={styles.containerListTransacoes}>
            {transacao.map((transacoes) => (
              <ItemTransacao
                nomeTransacao={transacoes.nome}
                dataTransacao={transacoes.data}
                icon={transacoes.icon}
                valorTransacao={transacoes.valor}
              />
            ))}
          </div>
        </div>
        <div className={styles.miniCharts}>
          <div className={styles.chartInvestimentos}>
            <div className={styles.headerChartTransacao}>
              <div className={styles.containerIconeChart}>
                <LuHandCoins size={20} />
              </div>
              <p className={styles.nomeChart}>Investimentos</p>
            </div>
            <div className={styles.infoValueChart}>
              <h2 className={styles.valuesChartsInvestimento}>R$ 2.700</h2>
            </div>
          </div>
          <div className={styles.chartReceita}>
            <div className={styles.headerChartTransacao}>
              <div className={styles.containerIconeChartInvestimento}>
                <LuTrendingUp size={20} />
              </div>
              <p className={styles.nomeChart}>Receita</p>
            </div>
            <div className={styles.infoValueChart}>
              <h2 className={styles.valuesChartsInvestimento}>R$ 2.700</h2>
            </div>
          </div>
          <div className={styles.chartDespesas}>
            <div className={styles.headerChartTransacao}>
              <div className={styles.containerIconeChartDespesas}>
                <LuTrendingDown size={20} />
              </div>
              <p className={styles.nomeChart}>Despesas</p>
            </div>
            <div className={styles.infoValueChart}>
              <h2 className={styles.valuesChartsInvestimento}>R$ 2.700</h2>
            </div>
          </div>
        </div>
        <div className={styles.chartCategorias1}>
          <ChartCategoria />
          <div className={styles.flexCategorias}>
            <div className={styles.flexCategoriasInvestimentos}>
              <FaCircle
                size={14}
                className={styles.iconCategoriaInvestimento}
              />
              <p className={styles.nomeChartCategorias}>Investimentos</p>
            </div>
            <div className={styles.flexCategoriasReceita}>
              <FaCircle size={14} className={styles.iconCategoriaReceita} />
              <p className={styles.nomeChartCategorias}>Receita</p>
            </div>
            <div className={styles.flexCategoriasDespesas}>
              <FaCircle size={14} className={styles.iconCategoriaDespesas} />
              <p className={styles.nomeChartCategorias}>Despesas</p>
            </div>
          </div>
        </div>
        <div className={styles.chartCategorias2}>
          <GastosPorCategoria />
        </div>
      </div>
    </div>
  );
}
