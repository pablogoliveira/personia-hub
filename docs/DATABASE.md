
# Documentação do Banco de Dados

## Visão Geral

O Sistema de Cadastro de Pessoas utiliza um banco de dados MySQL para armazenar informações pessoais, endereços e contatos. O banco foi projetado para garantir integridade referencial, desempenho em consultas e validação de dados.

## Modelo de Dados

### Tabela Principal: `Pessoas`

A tabela `Pessoas` armazena todos os dados cadastrais em um modelo desnormalizado para simplificar consultas e manutenção.

#### Estrutura da Tabela

| Coluna           | Tipo         | Restrições        | Descrição                         |
|------------------|--------------|-------------------|-----------------------------------|
| id               | VARCHAR(36)  | PK                | UUID da pessoa                    |
| nome             | VARCHAR(100) | NOT NULL          | Nome completo                     |
| dataNascimento   | DATE         | NOT NULL          | Data de nascimento                |
| nomeMae          | VARCHAR(100) | NOT NULL          | Nome da mãe                       |
| rg               | VARCHAR(20)  | NOT NULL          | Número do RG                      |
| cpf              | VARCHAR(14)  | NOT NULL, UNIQUE  | CPF (formato: XXX.XXX.XXX-XX)     |
| cep              | VARCHAR(9)   | NOT NULL          | CEP (formato: XXXXX-XXX)         |
| logradouro       | VARCHAR(100) | NOT NULL          | Logradouro                        |
| numero           | VARCHAR(20)  | NOT NULL          | Número do endereço                |
| complemento      | VARCHAR(100) |                   | Complemento do endereço           |
| bairro           | VARCHAR(100) | NOT NULL          | Bairro                            |
| cidade           | VARCHAR(100) | NOT NULL          | Cidade                            |
| estado           | CHAR(2)      | NOT NULL          | Estado (UF)                       |
| telefone         | VARCHAR(15)  | NOT NULL          | Telefone com DDD                  |
| email            | VARCHAR(100) | NOT NULL, UNIQUE  | E-mail                            |
| createdAt        | TIMESTAMP    | DEFAULT CURRENT   | Data de criação do registro       |
| updatedAt        | TIMESTAMP    | DEFAULT CURRENT   | Data da última atualização        |

#### Índices

| Nome         | Colunas   | Tipo      | Descrição                       |
|--------------|-----------|-----------|----------------------------------|
| PRIMARY      | id        | PRIMARY   | Chave primária                   |
| idx_cpf      | cpf       | UNIQUE    | Índice para busca e unicidade    |
| idx_email    | email     | UNIQUE    | Índice para busca e unicidade    |
| idx_nome     | nome      | REGULAR   | Índice para busca por nome       |

## Migração do Banco de Dados

O sistema utiliza Sequelize como ORM e inclui migrações para controle de versão do banco.

### Arquivo de Migração Principal

```javascript
// 20230720000000-create-person.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pessoas', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      nome: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      dataNascimento: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      nomeMae: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      rg: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      cpf: {
        type: Sequelize.STRING(14),
        allowNull: false,
        unique: true
      },
      // ... demais campos
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    await queryInterface.addIndex('Pessoas', ['cpf']);
    await queryInterface.addIndex('Pessoas', ['email']);
    await queryInterface.addIndex('Pessoas', ['nome']);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Pessoas');
  }
};
```

## Modelo Sequelize

```javascript
// person.js
module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define('Person', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    // ... outros campos com validações
  }, {
    tableName: 'Pessoas'
  });

  return Person;
};
```

## Configuração do Banco

A configuração do banco de dados é gerenciada pelo arquivo `config.js`:

```javascript
// config.js
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false
  },
  // ... configurações para test e production
};
```

## Script de Inicialização

Para facilitar a configuração inicial do banco de dados, o sistema inclui um script de inicialização:

```javascript
// setup-database.js
async function setupDatabase() {
  // Cria o banco se não existir
  const connection = mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USERNAME,
    password: DB_PASSWORD
  });
  
  connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`, (err) => {
    // ... executa migrações
  });
}
```

## Integridade e Validação de Dados

O banco implementa as seguintes estratégias para garantir a integridade dos dados:

1. **Restrições de Nível de Banco**:
   - Chaves primárias
   - Restrições de unicidade
   - Campos obrigatórios (NOT NULL)

2. **Validações no ORM**:
   - Validação de formato
   - Verificação de comprimento
   - Validação de tipo de dados

3. **Validações na Aplicação**:
   - Validação de CPF
   - Validação de e-mail
   - Formatação e padronização de dados

## Diagrama Entidade-Relacionamento

```
+-------------------+
|      Pessoas      |
+-------------------+
| PK id             |
|    nome           |
|    dataNascimento |
|    nomeMae        |
|    rg             |
|    cpf (U)        |
|    cep            |
|    logradouro     |
|    numero         |
|    complemento    |
|    bairro         |
|    cidade         |
|    estado         |
|    telefone       |
|    email (U)      |
|    createdAt      |
|    updatedAt      |
+-------------------+
```

## Consultas Comuns

### Busca Paginada com Filtro

```sql
SELECT * FROM Pessoas
WHERE 
  nome LIKE :search OR 
  cpf LIKE :search OR 
  email LIKE :search
ORDER BY nome ASC
LIMIT :limit OFFSET :offset
```

### Contagem Total com Filtro

```sql
SELECT COUNT(*) as count FROM Pessoas
WHERE 
  nome LIKE :search OR 
  cpf LIKE :search OR 
  email LIKE :search
```

### Busca por CPF

```sql
SELECT * FROM Pessoas
WHERE cpf = :cpf
LIMIT 1
```

## Backup e Recuperação

### Backup do Banco

```bash
mysqldump -u [username] -p [database_name] > backup_file.sql
```

### Restauração do Banco

```bash
mysql -u [username] -p [database_name] < backup_file.sql
```

## Desempenho

Para garantir o desempenho adequado do banco de dados, considere:

1. **Índices**: Os índices em `cpf`, `email` e `nome` otimizam as consultas mais frequentes
2. **Paginação**: Todas as listagens implementam paginação para limitar o volume de dados
3. **Consultas Otimizadas**: O ORM Sequelize é configurado para gerar consultas eficientes

## Considerações de Segurança

1. **Senhas e Dados Sensíveis**: Armazenados com práticas seguras
2. **Proteção contra SQL Injection**: Implementada pelo ORM
3. **Acesso ao Banco**: Limitado por credenciais e configurações de rede

## Evolução do Schema

Para futuras alterações no schema do banco, siga o procedimento:

1. Crie uma nova migração:
   ```
   npx sequelize-cli migration:generate --name add-new-column
   ```

2. Implemente as alterações no arquivo gerado:
   ```javascript
   module.exports = {
     up: async (queryInterface, Sequelize) => {
       await queryInterface.addColumn('Pessoas', 'novoAtributo', {
         type: Sequelize.STRING
       });
     },
     down: async (queryInterface) => {
       await queryInterface.removeColumn('Pessoas', 'novoAtributo');
     }
   };
   ```

3. Execute a migração:
   ```
   npx sequelize-cli db:migrate
   ```

## Ambiente de Desenvolvimento

Para configurar o banco em ambiente de desenvolvimento:

1. Instale o MySQL localmente ou use Docker:
   ```
   docker run --name mysql -e MYSQL_ROOT_PASSWORD=password -p 3306:3306 -d mysql:8
   ```

2. Execute o script de configuração:
   ```
   npm run setup-db
   ```
