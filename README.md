
# Sistema de Cadastro de Pessoas

Sistema completo para cadastro de pessoas com arquitetura hexagonal e microsserviços.

## Estrutura do Projeto

- **frontend**: Interface de usuário em React/TypeScript
- **backend**: API principal com arquitetura hexagonal usando Node.js e Sequelize
- **bff**: Backend For Frontend para intermediar a comunicação entre frontend e backend

## Pré-requisitos

- Node.js (v14 ou superior)
- MySQL (v8 ou superior)
- npm ou yarn

## Configuração do Banco de Dados

1. Instale o MySQL e crie um usuário (ou use o root)
2. Ajuste as variáveis de ambiente no arquivo `.env` no diretório `backend`

## Instalação e Execução

### Backend

```bash
# Entrar no diretório do backend
cd backend

# Instalar dependências
npm install

# Configurar banco de dados e executar migrações
npm run setup-db

# Iniciar servidor de desenvolvimento
npm run dev
```

### BFF (Backend For Frontend)

```bash
# Entrar no diretório do BFF
cd bff

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

### Frontend

```bash
# Entrar no diretório principal do projeto
cd frontend

# Instalar dependências
npm install

# Iniciar aplicação React
npm run dev
```

## Portas Padrão

- Frontend: http://localhost:8080
- BFF: http://localhost:3002
- Backend: http://localhost:3001

## API Endpoints

### Pessoas

- `GET /api/pessoas` - Listar pessoas com paginação
- `GET /api/pessoas/:id` - Buscar pessoa por ID
- `POST /api/pessoas` - Criar nova pessoa
- `PUT /api/pessoas/:id` - Atualizar pessoa existente
- `DELETE /api/pessoas/:id` - Excluir pessoa

## Arquitetura

### Hexagonal (Ports and Adapters)

O backend segue a arquitetura hexagonal dividida em:

1. **Domain Layer**: Contém as entidades de negócio e interfaces de repositórios
2. **Application Layer**: Casos de uso que implementam a lógica de negócio
3. **Infrastructure Layer**: Adaptadores para frameworks e tecnologias externas

### Microsserviços

O sistema é dividido em:

1. **Frontend**: Interface de usuário React/TypeScript
2. **BFF**: Backend For Frontend para otimizar a comunicação
3. **Backend**: Serviço principal com a lógica de negócio e persistência

## Validações

O sistema implementa validações em múltiplas camadas:

1. **Frontend**: Validação em tempo real com feedback visual
2. **BFF**: Validação adicional antes de encaminhar para o backend
3. **Backend**: Validação de regras de negócio e consistência dos dados
4. **Banco de Dados**: Constraints para garantir integridade

## Desenvolvimento

### Scripts Úteis

**Backend:**
- `npm run dev`: Inicia o servidor em modo desenvolvimento
- `npm test`: Executa os testes unitários
- `npm run setup-db`: Configura o banco de dados e executa migrações

**BFF:**
- `npm run dev`: Inicia o servidor BFF em modo desenvolvimento

**Frontend:**
- `npm run dev`: Inicia o servidor de desenvolvimento React
- `npm test`: Executa os testes unitários
- `npm run build`: Gera a versão de produção

## Licença

Este projeto está licenciado sob a licença MIT.
