-- CreateTable
CREATE TABLE "Transacoes" (
    "id" SERIAL NOT NULL,
    "nome_transacao" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "tipo_transacao" TEXT NOT NULL,
    "pagamento" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transacoes_pkey" PRIMARY KEY ("id")
);
