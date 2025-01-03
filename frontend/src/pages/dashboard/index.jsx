import { useRef, useState, useEffect } from "react";
import styles from "./style.module.css"; // Nome do objeto ajustado
import api from "../../services/api";
import Header from "../../components/Header";
import { Helmet } from "react-helmet";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonPrimaryTransac from "../../components/ButtonPrimaryTransac";
import {
  LuWalletMinimal,
  LuEye,
  LuHandCoins,
  LuTrendingUp,
  LuTrendingDown,
  LuCreditCard,
  LuBarcode,
} from "react-icons/lu";
import ChartCategoria from "../../components/ChartCategoria";
import { FaCircle } from "react-icons/fa";
import { BsXDiamond } from "react-icons/bs";
import { TbTransfer, TbMoodEmpty } from "react-icons/tb";
import ItemTransacao from "../../components/ItemTransacao";
import GastosPorCategoria from "../../components/ChartGastosGategoria";
import InputPrimary from "../../components/InputPrimary";
import InputSelectTipoTransacao from "../../components/InputSelectTipoTransacao";
import InputSelectPagamento from "../../components/InputSelectPagamento";
import ButtonCancelOut from "../../components/ButtonCancelOut";

export default function App() {
  // Mostrar Valores Dashboard
  const [mostraValor, setMostrarValor] = useState(true);
  const handleMostrarValor = () => {
    setMostrarValor(!mostraValor);
  };
  // Controlar o Popup transição.
  const [popupOpen, setPopupOpen] = useState(false);
  const popupRef = useRef(null);
  const togglePopup = () => {
    setPopupOpen(!popupOpen);
  };
  // Verificação do clique fora do popup
  const handleClickExit = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setPopupOpen(false);
    }
  };
  useEffect(() => {
    if (popupOpen) {
      document.addEventListener("mousedown", handleClickExit);
    } else {
      document.removeEventListener("mousedown", handleClickExit);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickExit);
    };
  }, [popupOpen]);
  // Formatação do valor da transação
  const formatarValor = (valor) => {
    const numeroLimpo = valor.replace(/[^\d]/g, ""); //Remove tudo o que não for número
    const numeroFormatado = (Number(numeroLimpo) / 100).toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    );
    return numeroFormatado;
  };
  // Função para requisitar o cadastro da transação
  const [nomeTransac, setNomeTransac] = useState("");
  const [tipoTransac, setTipoTransac] = useState("");
  const [pagamentoTransac, setPagamentoTransac] = useState("");
  const [dataTransac, setDataTransac] = useState("");
  const [descricao, setDescricao] = useState("");
  const createTransacao = async (e) => {
    try {
      const valorNumerico = parseFloat(
        valorInput
          .replace(/\./g, "")
          .replace(",", ".")
          .replace(/[^\d.-]/g, "")
      );

      const response = await api.post("/transac", {
        nome_transacao: nomeTransac,
        valor: valorNumerico,
        tipo_transacao: tipoTransac,
        pagamento: pagamentoTransac,
        descricao: descricao,
        data: new Date(dataTransac).toISOString(),
      });

      // Atualizar o estado com a nova transação
      setTransacoes((prevTransacoes) => {
        const novasTransacoes = [...prevTransacoes, response.data];

        // Recalcular as despesas imediatamente
        const total = novasTransacoes
          .filter((despesa) => despesa.tipo_transacao === "saida")
          .reduce((soma, despesa) => soma + Number(despesa.valor), 0);
        setTotalDespesas(total);

        return novasTransacoes.sort(
          (a, b) => new Date(b.data) - new Date(a.data)
        );
      });

      // Resetar os campos dos inputs
      setNomeTransac("");
      setValorInput("R$ 0,00");
      setTipoTransac("");
      setPagamentoTransac("");
      setDataTransac("");

      // Fechar o popup
      setPopupOpen(false);
      // Ordenar as transações novamente após adicionar
    } catch (error) {
      console.log(
        "Erro ao criar a transação",
        error.response?.data || error.message
      );
      alert(error.response?.data?.error || "Erro ao cadastrar transação");
    }
  };

  const [valorInput, setValorInput] = useState("R$ 0,00");
  // Todo código abaixo desse comentário vai ser para buscar valores e manipular os mesmos para exibir na dasbhoard
  const [transacoes, setTransacoes] = useState([]);
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [totalReceita, setTotalReceita] = useState(0);
  const [totalSaldo, setTotalSaldo] = useState(0);
  const [totalInvestimentos, setTotalInvestimentos] = useState(0);
  useEffect(() => {
    const fetchTransacoes = async () => {
      try {
        const responseTransac = await api.get("/transac");
        console.log("Transações do banco:", responseTransac.data);
        // Ordenar transações
        const transacoesOrdenadas = responseTransac.data.sort(
          (a, b) => new Date(b.data) - new Date(a.data)
        );
        setTransacoes(responseTransac.data);
      } catch (error) {
        console.log("Erro ao buscar transações", error.message);
      }
    };
    fetchTransacoes();
  }, []);
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
      setTotalSaldo(receitas - despesas - investimentos);
    };

    calcularTotais();
  }, [transacoes]); // Será executado toda vez que "transacoes" mudar

  // Mudança dos icones de transações
  const metodoPagamentoIcons = {
    boleto: LuBarcode,
    cartaodecredito: LuCreditCard,
    dinheiro: LuHandCoins,
    pix: BsXDiamond,
    transferencia: TbTransfer,
  };
  const [transacaoSelecionada, setTransacaoSelecionada] = useState(null);
  // Função para abrir o popup com a transação selecionada
  const handleItemClick = (transacao) => {
    setTransacaoSelecionada(transacao);
  };

  // Função para fechar o popup
  const handleClosePopup = () => {
    setTransacaoSelecionada(null);
  };

  return (
    <div className={styles.container}>
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>GeFinance | Dashboard</title>
      </Helmet>
      <Header />
      {/* Popup Transacao */}
      {popupOpen && (
        <div ref={popupRef} className={styles.containerPopup}>
          <div className={styles.containerHeaderPopup}>
            <h3 className={styles.nomePopup}>Adicionar Transação</h3>
            <p className={styles.descricaoPopup}>
              Insira as informações abaixo
            </p>
          </div>
          <form onSubmit={createTransacao}>
            <div className={styles.containerBodyPopup}>
              <div className={styles.cardInput}>
                <label htmlFor="nome_transacao" className={styles.label}>
                  Título
                </label>
                <InputPrimary
                  placeholder={"Título"}
                  type={"text"}
                  value={nomeTransac}
                  onChange={(e) => setNomeTransac(e.target.value)}
                />
              </div>
              <div className={styles.cardInput}>
                <label htmlFor="nome_transacao" className={styles.label}>
                  Valor
                </label>
                <InputPrimary
                  placeholder={"R$ 0.000,00"}
                  type={"text"}
                  value={valorInput}
                  onChange={(e) => setValorInput(formatarValor(e.target.value))}
                />
              </div>
              <div className={styles.cardInput}>
                <label htmlFor="nome_transacao" className={styles.label}>
                  Tipo de Transação
                </label>
                <InputSelectTipoTransacao
                  value={tipoTransac}
                  onChange={(e) => setTipoTransac(e.target.value)}
                />
              </div>
              <div className={styles.cardInput}>
                <label htmlFor="nome_transacao" className={styles.label}>
                  Método de pagamento
                </label>
                <InputSelectPagamento
                  name={"input-metodo-transacao"}
                  placeholder={"Selecione"}
                  value={pagamentoTransac}
                  onChange={(e) => setPagamentoTransac(e.target.value)}
                />
              </div>
              <div className={styles.cardInput}>
                <label htmlFor="nome_transacao" className={styles.label}>
                  Descrição da Transação
                </label>
                <InputPrimary
                  placeholder={"Adicione uma descrição"}
                  type={"textarea"}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </div>
              <div className={styles.cardInput}>
                <label htmlFor="nome_transacao" className={styles.label}>
                  Data
                </label>
                <InputPrimary
                  placeholder={"Selecione a data"}
                  type={"date"}
                  value={dataTransac}
                  onChange={(e) => setDataTransac(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.containerFooterPopup}>
              <ButtonCancelOut nome={"Cancelar"} onClick={togglePopup} />
              <ButtonPrimary nome={"Adicionar"} type={"submit"} />
            </div>
          </form>
        </div>
      )}

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
              {mostraValor ? (
                <h2 className={styles.valuesCharts}>
                  {totalSaldo.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </h2>
              ) : (
                <div className={styles.containerEsconderValores}></div>
              )}

              <button
                className={styles.buttonHidenValues}
                onClick={handleMostrarValor}
              >
                <LuEye size={20} />
              </button>
            </div>
            <ButtonPrimaryTransac
              nome={"+ Adicionar Transação"}
              onClick={togglePopup}
            />
          </div>
        </div>
        <div className={styles.chartTransacoes}>
          <div className={styles.headerChartTransacao1}>
            <p className={styles.nomeChart}>Transações</p>
            <a href="/transac" className={styles.linkRedirec}>
              Ver mais
            </a>
          </div>
          <div className={styles.containerListTransacoes}>
            {transacoes.length === 0 ? (
              <div className={styles.containerEmptyTransac}>
                <TbMoodEmpty size={60} className={styles.iconeEmpty} />
                <h3 className={styles.textEmpty}>
                  Você ainda não tem transações
                </h3>
              </div>
            ) : (
              transacoes.map((transacao, index) => {
                const Icon =
                  metodoPagamentoIcons[transacao.pagamento] || LuWalletMinimal;

                return (
                  <ItemTransacao
                    key={index}
                    nomeTransacao={transacao.nome_transacao}
                    dataTransacao={new Date(
                      transacao.data
                    ).toLocaleDateString()}
                    icon={Icon}
                    valorTransacao={mostraValor ? (
                      <p className={styles.valuesTransacs}>
                        {transacao.valor.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>
                    ) : (
                      <div className={styles.containerEsconderValoresTransacs}></div>
                    )}
                    onClick={() => handleItemClick(transacao)} // Chama a função com a transação
                  />
                );
              })
            )}

            {/* Popup para exibir as informações da transação */}
            {transacaoSelecionada && (
              <div className={styles.containerPopup}>
                <div className={styles.containerHeaderPopup}>
                  <h3 className={styles.nomePopup}>Informações da Transação</h3>
                  <p className={styles.descricaoPopup}>
                    Confira os detalhes da sua transação
                  </p>
                </div>
                <div className={styles.containerBodyPopup}>
                  <div className={styles.cardDetalInfoTransac}>
                    <strong>Nome:</strong>
                    <p>{transacaoSelecionada.nome_transacao}</p>
                  </div>

                  <p>
                    <strong>Data:</strong>{" "}
                    {new Date(transacaoSelecionada.data).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Valor:</strong>{" "}
                    {transacaoSelecionada.valor.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                  <p>
                    <strong>Método de Pagamento:</strong>{" "}
                    {transacaoSelecionada.pagamento}
                  </p>
                  <ButtonCancelOut nome={"Fechar"} onClick={handleClosePopup} />
                </div>
              </div>
            )}
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
              <h2 className={styles.valuesChartsInvestimento}>
                {mostraValor ? (
                  <h2 className={styles.valuesChartsInvestimento}>
                    {totalInvestimentos.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </h2>
                ) : (
                  <div className={styles.containerEsconderValores}></div>
                )}
              </h2>
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
              <h2 className={styles.valuesChartsInvestimento}>
                {mostraValor ? (
                  <h2 className={styles.valuesChartsInvestimento}>
                    {totalReceita.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </h2>
                ) : (
                  <div className={styles.containerEsconderValores}></div>
                )}
              </h2>
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
              <h2 className={styles.valuesChartsInvestimento}>
                {mostraValor ? (
                  <h2 className={styles.valuesChartsInvestimento}>
                    {totalDespesas.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </h2>
                ) : (
                  <div className={styles.containerEsconderValores}></div>
                )}
              </h2>
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
