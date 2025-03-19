
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Cadastro de Pessoas',
      version: '1.0.0',
      description: 'API para gerenciamento de cadastro de pessoas',
      contact: {
        name: 'Suporte',
        email: 'suporte@exemplo.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3001}`,
        description: 'Servidor de Desenvolvimento'
      }
    ],
    components: {
      schemas: {
        Person: {
          type: 'object',
          required: [
            'nome', 'dataNascimento', 'nomeMae', 'rg', 'cpf', 'cep',
            'logradouro', 'numero', 'bairro', 'cidade', 'estado',
            'telefone', 'email'
          ],
          properties: {
            id: {
              type: 'string',
              description: 'UUID único da pessoa',
              example: '550e8400-e29b-41d4-a716-446655440000'
            },
            nome: {
              type: 'string',
              description: 'Nome completo da pessoa',
              example: 'João da Silva'
            },
            dataNascimento: {
              type: 'string',
              format: 'date',
              description: 'Data de nascimento (YYYY-MM-DD)',
              example: '1990-01-01'
            },
            nomeMae: {
              type: 'string',
              description: 'Nome da mãe',
              example: 'Maria da Silva'
            },
            rg: {
              type: 'string',
              description: 'Número do RG',
              example: '12.345.678-9'
            },
            cpf: {
              type: 'string',
              description: 'Número do CPF',
              example: '123.456.789-00'
            },
            cep: {
              type: 'string',
              description: 'CEP',
              example: '01001-000'
            },
            logradouro: {
              type: 'string',
              description: 'Logradouro',
              example: 'Avenida Paulista'
            },
            numero: {
              type: 'string',
              description: 'Número do endereço',
              example: '1000'
            },
            complemento: {
              type: 'string',
              description: 'Complemento do endereço',
              example: 'Apto 100'
            },
            bairro: {
              type: 'string',
              description: 'Bairro',
              example: 'Bela Vista'
            },
            cidade: {
              type: 'string',
              description: 'Cidade',
              example: 'São Paulo'
            },
            estado: {
              type: 'string',
              description: 'Estado (UF)',
              example: 'SP'
            },
            telefone: {
              type: 'string',
              description: 'Telefone com DDD',
              example: '(11) 98765-4321'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'E-mail',
              example: 'joao@exemplo.com'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            status: {
              type: 'integer',
              description: 'Código HTTP do erro',
              example: 400
            },
            error: {
              type: 'string',
              description: 'Tipo do erro',
              example: 'Bad Request'
            },
            message: {
              type: 'string',
              description: 'Mensagem de erro',
              example: 'CPF já cadastrado'
            }
          }
        }
      }
    }
  },
  apis: ['./src/infrastructure/http/routes/*.js', './src/infrastructure/http/swagger/definitions/*.js']
};

const specs = swaggerJsDoc(options);

const serve = swaggerUi.serve;
const setup = swaggerUi.setup(specs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }'
});

module.exports = { serve, setup };
