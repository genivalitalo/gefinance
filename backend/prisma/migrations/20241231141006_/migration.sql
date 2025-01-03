/*
  Warnings:

  - Changed the type of `valor` on the `Transacoes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Transacoes" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "valor",
ADD COLUMN     "valor" DOUBLE PRECISION NOT NULL;
