
# Documentação de API

Este documento descreve as APIs e serviços utilizados pela aplicação Sistema de Cadastro de Pessoas, bem como a estrutura de dados e endpoints para integração futura com backend.

## API Externa: ViaCEP

A aplicação utiliza o serviço ViaCEP para busca de endereços a partir do CEP.

### Endpoint

```
https://viacep.com.br/ws/{cep}/json/
```

Onde `{cep}` é o CEP informado pelo usuário (somente números).

### Resposta

```json
{
  "cep": "01001-000",
  "logradouro": "Praça da Sé",
  "complemento": "lado ímpar",
  "bairro": "Sé",
  "localidade": "São Paulo",
  "uf": "SP",
  "ibge": "3550308",
  "gia": "1004",
  "ddd": "11",
  "siafi": "7107"
}
```

### Implementação

O serviço está implementado no arquivo `src/utils/cepService.ts` e realiza:

1. Limpeza do CEP (remove caracteres não numéricos)
2. Validação básica (8 dígitos)
3. Requisição à API
4. Tratamento da resposta
5. Mapeamento para o formato interno da aplicação

```typescript
// Mapeamento de resposta da API para o formato interno
return {
  logradouro: data.logradouro || '',
  bairro: data.bairro || '',
  cidade: data.localidade || '',
  estado: data.uf || '',
};
```

## Estrutura de Dados

A aplicação manipula os seguintes tipos de dados:

### PersonFormData

```typescript
interface PersonFormData {
  id: string;
  nome: string;
  dataNascimento: string;
  nomeMae: string;
  rg: string;
  cpf: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  telefone: string;
  email: string;
}
```

### AddressData

```typescript
type AddressData = {
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
  erro?: boolean;
};
```

## Integração Backend (Proposta)

Para implementação futura de backend, sugerimos os seguintes endpoints RESTful:

### Cadastro de Pessoa

```
POST /api/pessoas
```

**Corpo da requisição**:
```json
{
  "nome": "João Silva",
  "dataNascimento": "1990-01-01",
  "nomeMae": "Maria Silva",
  "rg": "12.345.678-9",
  "cpf": "123.456.789-00",
  "endereco": {
    "cep": "01001-000",
    "logradouro": "Praça da Sé",
    "numero": "123",
    "complemento": "Apto 101",
    "bairro": "Sé",
    "cidade": "São Paulo",
    "estado": "SP"
  },
  "contato": {
    "telefone": "(11) 98765-4321",
    "email": "joao@example.com"
  }
}
```

**Resposta de sucesso (201 Created)**:
```json
{
  "id": "12345",
  "nome": "João Silva",
  "dataNascimento": "1990-01-01",
  "nomeMae": "Maria Silva",
  "rg": "12.345.678-9",
  "cpf": "123.456.789-00",
  "endereco": {
    "cep": "01001-000",
    "logradouro": "Praça da Sé",
    "numero": "123",
    "complemento": "Apto 101",
    "bairro": "Sé",
    "cidade": "São Paulo",
    "estado": "SP"
  },
  "contato": {
    "telefone": "(11) 98765-4321",
    "email": "joao@example.com"
  },
  "dataCadastro": "2023-07-12T15:30:45Z"
}
```

### Consulta de Pessoa

```
GET /api/pessoas/{id}
```

**Resposta (200 OK)**:
Mesmo formato da resposta de cadastro.

### Listagem de Pessoas

```
GET /api/pessoas
```

**Parâmetros de consulta (query params)**:
- `page`: Número da página (padrão: 1)
- `limit`: Registros por página (padrão: 10)
- `sort`: Campo para ordenação (padrão: "nome")
- `order`: Ordem (asc/desc, padrão: "asc")
- `search`: Texto para busca

**Resposta (200 OK)**:
```json
{
  "data": [
    {
      "id": "12345",
      "nome": "João Silva",
      "cpf": "123.456.789-00",
      "email": "joao@example.com"
    },
    // ... outros registros
  ],
  "pagination": {
    "totalItems": 42,
    "totalPages": 5,
    "currentPage": 1,
    "itemsPerPage": 10
  }
}
```

### Atualização de Pessoa

```
PUT /api/pessoas/{id}
```

**Corpo da requisição**:
Mesmo formato do cadastro.

**Resposta (200 OK)**:
Registro atualizado no mesmo formato da resposta de cadastro.

### Exclusão de Pessoa

```
DELETE /api/pessoas/{id}
```

**Resposta (204 No Content)**:
Sem corpo na resposta.

## Validações de API

A validação de dados no backend deverá implementar:

1. **Campos obrigatórios**: Verificação de campos null ou vazios
2. **Formato de CPF**: Validação estrutural e algorítmica
3. **Formato de e-mail**: Validação estrutural
4. **Formato de telefone**: Validação de formato DDD + número
5. **Unicidade de CPF**: Verificação de duplicidade no banco
6. **Unicidade de e-mail**: Verificação de duplicidade no banco

## Tratamento de Erros

Os erros da API deverão seguir um formato padronizado:

```json
{
  "status": 400,
  "error": "Bad Request",
  "message": "Dados inválidos",
  "details": [
    {
      "field": "cpf",
      "message": "CPF inválido"
    },
    {
      "field": "email",
      "message": "E-mail já cadastrado"
    }
  ],
  "timestamp": "2023-07-12T15:30:45Z"
}
```

## Autenticação (Recomendação Futura)

Recomenda-se implementar autenticação via JWT (JSON Web Token):

1. **Login**:
   ```
   POST /api/auth/login
   ```

2. **Token**:
   ```
   Authorization: Bearer <token>
   ```

3. **Refresh**:
   ```
   POST /api/auth/refresh
   ```

## Estrutura de Banco de Dados (Proposta)

```sql
CREATE TABLE pessoas (
  id VARCHAR(36) PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  data_nascimento DATE NOT NULL,
  nome_mae VARCHAR(100) NOT NULL,
  rg VARCHAR(20) NOT NULL,
  cpf VARCHAR(14) NOT NULL UNIQUE,
  cep VARCHAR(9) NOT NULL,
  logradouro VARCHAR(100) NOT NULL,
  numero VARCHAR(20) NOT NULL,
  complemento VARCHAR(100),
  bairro VARCHAR(100) NOT NULL,
  cidade VARCHAR(100) NOT NULL,
  estado CHAR(2) NOT NULL,
  telefone VARCHAR(15) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_cpf (cpf),
  INDEX idx_email (email),
  INDEX idx_nome (nome)
);
```
