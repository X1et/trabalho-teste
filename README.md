# Sistema de Gestão de Recursos e Equipamentos

Sistema para gerenciamento de recursos e equipamentos de uma empresa, permitindo o controle de alocação, manutenção e histórico de uso.

## Tecnologias Utilizadas

### Backend
- Node.js
- Express
- Sequelize (ORM)
- PostgreSQL
- JWT para autenticação
- Swagger para documentação da API

### Frontend
- React
- React Router
- Axios
- Context API para gerenciamento de estado

### DevOps
- Docker e Docker Compose
- GitHub Actions para CI/CD

## Funcionalidades

- Autenticação de usuários (login/registro)
- Gestão de equipamentos (CRUD)
- Atribuição de equipamentos a usuários
- Controle de status dos equipamentos
- Documentação da API com Swagger

## Como Executar

### Pré-requisitos
- Docker e Docker Compose instalados
- Node.js (para desenvolvimento local)

### Usando Docker

1. Clone o repositório:
```
git clone https://github.com/seu-usuario/sistema-gestao-equipamentos.git
cd sistema-gestao-equipamentos
```

2. Inicie os containers:
```
docker-compose up -d
```

3. Acesse:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Documentação Swagger: http://localhost:5000/api-docs

### Desenvolvimento Local

#### Backend
```
cd backend
npm install
npm run dev
```

#### Frontend
```
cd frontend
npm install
npm start
```

## Estrutura do Projeto

### Backend
```
backend/
  ├── src/
  │   ├── config/       # Configurações (banco de dados, etc)
  │   ├── controllers/  # Controladores da aplicação
  │   ├── middlewares/  # Middlewares (autenticação, etc)
  │   ├── models/       # Modelos Sequelize
  │   ├── routes/       # Rotas da API
  │   ├── migrations/   # Migrações do banco de dados
  │   └── server.js     # Ponto de entrada da aplicação
  ├── .sequelizerc      # Configuração do Sequelize CLI
  ├── Dockerfile        # Configuração do Docker
  └── package.json      # Dependências
```

### Frontend
```
frontend/
  ├── src/
  │   ├── components/   # Componentes React reutilizáveis
  │   ├── contexts/     # Context API para gerenciamento de estado
  │   ├── pages/        # Páginas da aplicação
  │   ├── App.js        # Componente principal
  │   └── index.js      # Ponto de entrada
  ├── Dockerfile        # Configuração do Docker
  └── package.json      # Dependências
```

## API Endpoints

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Login de usuário

### Equipamentos
- `GET /api/equipment` - Listar todos os equipamentos
- `GET /api/equipment/:id` - Obter detalhes de um equipamento
- `POST /api/equipment` - Criar novo equipamento
- `PUT /api/equipment/:id` - Atualizar equipamento
- `DELETE /api/equipment/:id` - Excluir equipamento

### Usuários
- `GET /api/users` - Listar todos os usuários

## CI/CD

O projeto utiliza GitHub Actions para:
- Executar testes automatizados
- Construir e publicar imagens Docker
- Implementar em ambiente de produção (quando configurado)

## Licença

Este projeto está licenciado sob a licença MIT.