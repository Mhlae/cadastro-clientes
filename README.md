# Cadastro de Clientes

Aplicação full-stack simples feita com auxilio de AI para aprendizagem.
Cadastro, listagem, edição e exclusão de clientes utilizando:

- Node.js + Express + SQLite no backend
- React + Vite no frontend

## Estrutura do projeto

- `backend/` — API REST com rotas para clientes
- `frontend/` — interface em React para consumir a API

## Requisitos

- Node.js 18+
- npm

## Backend

### Instalar dependências

```bash
cd backend
npm install
```

### Rodar o servidor

```bash
node server.js
```

O backend roda na porta `8080`.

### Rotas disponíveis

- `GET /` — mensagem de status da API
- `GET /clientes` — lista todos os clientes
- `POST /clientes` — cadastra um cliente
- `PUT /clientes/:id` — atualiza um cliente
- `DELETE /clientes/:id` — remove um cliente

## Frontend

### Instalar dependências

```bash
cd frontend
npm install
```

### Rodar a aplicação

```bash
npm run dev
```

A aplicação fica disponível em:

- `http://localhost:5173/`

## Funcionalidades

- Cadastro de clientes com nome, e-mail e telefone
- Listagem de clientes cadastrados
- Edição de dados existentes
- Exclusão de clientes
- Integração com o backend via `fetch`

## Banco de dados

O backend usa SQLite e cria automaticamente a tabela `Persons` no arquivo `backend/clients.db`.
