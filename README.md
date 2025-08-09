# Trimestral Insight Hub (prototype)

Este repositório contém um protótipo simples de backend FastAPI e frontend React.

## Backend

### Execução com SQLite

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Execução com Docker/Postgres

```bash
docker-compose up --build
```

### Testes

```bash
cd backend
pytest
```

## Frontend

```bash
npm install
npm run dev
```

## Variáveis de ambiente

Copie `.env.example` para `.env` e ajuste se necessário.
