/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Pessoa` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Pessoa" ADD COLUMN "email" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Pessoa_email_key" ON "Pessoa"("email");
