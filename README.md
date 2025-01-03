# Mini Sistema Financeiro

Este é um **mini sistema financeiro de código aberto**, desenvolvido para aprimorar conhecimentos em tecnologias como **React**, **Node.js**, **Prisma** e **PostgreSQL**. O sistema permite o cadastro de transações financeiras, exibição de saldos e outras funcionalidades básicas de gestão financeira.

---

## 🎯 Funcionalidades

- Cadastro de transações financeiras (receitas e despesas);
- Exibição de saldo total e detalhamento de transações;
- Separação por categorias e relatórios simples;
- Backend desenvolvido com **Node.js** e **Prisma ORM**;
- Banco de dados **PostgreSQL** para persistência.

---

## 🚀 Tecnologias Utilizadas

### Backend:
- Node.js
- Prisma ORM
- PostgreSQL

### Frontend:
- React
- Vite
- TailwindCSS

---

## 📦 Instalação e Configuração

### Pré-requisitos:
- **Node.js** (v20.18.0 ou superior)
- **PostgreSQL** (instância configurada)

### Configurando o Backend

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio/backend

### Instalção das Dependencias:
```bash
npm install

DATABASE_URL="postgresql://seu-usuario:senha@localhost:5432/nome_do_banco"
npx prisma migrate dev
npm install
VITE_API_URL="http://localhost:3000"
npm run dev

