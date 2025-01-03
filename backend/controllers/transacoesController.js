import prisma from "../prisma/prismaClient.js";

// Função para criar uma nova transação
export const createTransacao = async (req, res) => {
  // Campos a serem cadastrados
  const { nome_transacao, valor, tipo_transacao, pagamento, data, descricao } = req.body;

  // Validação: Verificar se todos os campos obrigatórios estão preenchidos
  if (!nome_transacao || !valor || !tipo_transacao || !pagamento || !data) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios" });
  }

  try {
    // Converter a data para o formato ISO
    const dataIso = new Date(data).toISOString();

    // Criar a transação no banco de dados
    const newTransacao = await prisma.transacoes.create({
      data: {
        nome_transacao,
        valor,
        tipo_transacao,
        pagamento,
        descricao,
        data: dataIso,
      },
    });

    // Retornar resposta de sucesso
    res
      .status(201)
      .json({ message: "Transação criada com sucesso", newTransacao });
  } catch (error) {
    console.error("Erro ao cadastrar uma transação", error);
    res
      .status(500)
      .json({ message: "Erro ao cadastrar a transação", error: error.message });
  }
};

// Função para buscar todas as transações
export const getTransacoes = async (req, res) => {
  try {
    // Busca todas as transações no banco
    const transacoes = await prisma.transacoes.findMany();

    // Retorna as transações em formato JSON
    res.status(200).json(transacoes);
  } catch (error) {
    console.error("Erro ao buscar transações", error.message);
    res
      .status(500)
      .json({ message: "Erro ao buscar transações", error: error.message });
  }
};
