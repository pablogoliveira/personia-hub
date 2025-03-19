
# Documentação do Backend

## Visão Geral

O backend do Sistema de Cadastro de Pessoas é uma aplicação Node.js que segue os princípios da Arquitetura Limpa (Clean Architecture) e fornece uma API REST para gerenciamento de pessoas. A aplicação é construída com Express.js e utiliza Sequelize como ORM para persistência de dados em MySQL.

## Estrutura do Projeto

```
backend/
├── scripts/                  # Scripts utilitários
│   └── setup-database.js     # Script para inicializar o banco de dados
├── src/
│   ├── application/          # Regras de aplicação
│   │   └── usecases/         # Casos de uso
│   ├── domain/               # Regras de negócio e entidades
│   │   ├── entities/         # Entidades do domínio
│   │   └── repositories/     # Interfaces de repositórios
│   └── infrastructure/       # Detalhes técnicos e ferramentas
│       ├── database/         # Configuração do banco de dados
│       │   ├── config/       # Configurações de conexão
│       │   ├── migrations/   # Migrações do banco
│       │   └── models/       # Modelos do Sequelize
│       ├── http/             # Componentes da camada HTTP
│       │   ├── controllers/  # Controladores das rotas
│       │   ├── middlewares/  # Middlewares do Express
│       │   ├── routes/       # Definição de rotas
│       │   └── swagger/      # Documentação da API
│       └── repositories/     # Implementações de repositórios
└── index.js                  # Ponto de entrada da aplicação
```

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript
- **Express**: Framework web para APIs REST
- **Sequelize**: ORM para mapeamento objeto-relacional
- **MySQL**: Sistema de gerenciamento de banco de dados relacional
- **Swagger**: Documentação de API
- **Jest**: Framework de testes

## Arquitetura

O backend segue a **Clean Architecture** (Arquitetura Limpa), dividindo o código em camadas concêntricas:

1. **Camada de Domínio**: Contém as entidades de negócio e interfaces de repositórios
2. **Camada de Aplicação**: Contém os casos de uso que orquestram as operações de negócio
3. **Camada de Infraestrutura**: Contém implementações concretas (banco de dados, controllers HTTP)

### Fluxo de Dados

```
Request → Controller → UseCase → Repository → Database
                                         ↑
Response ← Controller ← UseCase ← Entity ←
```

## API REST

### Endpoints

- `GET /api/pessoas`: Lista pessoas com paginação e busca
- `GET /api/pessoas/:id`: Busca uma pessoa pelo ID
- `POST /api/pessoas`: Cadastra uma nova pessoa
- `PUT /api/pessoas/:id`: Atualiza os dados de uma pessoa
- `DELETE /api/pessoas/:id`: Remove uma pessoa

### Documentação Swagger

A documentação completa da API está disponível em:
- `http://localhost:3001/api-docs`

## Validação de Dados

O backend implementa validações para garantir a consistência dos dados:

1. Campos obrigatórios
2. Validação de CPF (formato e algoritmo)
3. Validação de e-mail (formato)
4. Unicidade de CPF e e-mail
5. Formatação de dados (telefone, CEP)

## Tratamento de Erros

A aplicação implementa tratamento de erros consistente:

- Respostas de erro padronizadas (status HTTP + mensagem)
- Middleware global para captura de exceções
- Log de erros para depuração

## Configuração e Variáveis de Ambiente

As configurações são gerenciadas via variáveis de ambiente no arquivo `.env`:

```
# Database Configuration
DB_USERNAME=root
DB_PASSWORD=password
DB_NAME=person_registration
DB_HOST=localhost
DB_PORT=3306
DB_DIALECT=mysql

# Server Configuration
PORT=3001
NODE_ENV=development
```

## Inicialização

### Requisitos

- Node.js (v14+)
- MySQL (v8+)

### Passos para Execução

1. Instalar dependências:
   ```
   npm install
   ```

2. Configurar variáveis de ambiente:
   ```
   cp .env.example .env
   ```
   Ajuste as variáveis conforme seu ambiente.

3. Configurar o banco de dados:
   ```
   npm run setup-db
   ```

4. Iniciar o servidor:
   ```
   npm start
   ```
   ou em modo desenvolvimento:
   ```
   npm run dev
   ```

## Testes

Execute os testes automatizados com:
```
npm test
```

## Logs e Monitoramento

A aplicação registra logs de:
- Inicialização do servidor
- Conexão com banco de dados
- Erros de requisição
- Erros internos

## BFF (Backend For Frontend)

O sistema também inclui um BFF que atua como intermediário entre o frontend React e o backend principal. O BFF:

1. Simplifica as requisições do frontend
2. Unifica endpoints e formatos de resposta
3. Adiciona lógica específica para a interface do usuário
4. Implementa cache e otimizações quando necessário

O BFF está disponível na porta 3002 e documentado em:
- `http://localhost:3002/api-docs`
