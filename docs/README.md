
# Sistema de Cadastro de Pessoas

## Visão Geral

O Sistema de Cadastro de Pessoas é uma aplicação frontend desenvolvida em React e TypeScript, projetada para coletar e validar informações pessoais de forma intuitiva e elegante. A aplicação apresenta uma interface moderna, responsiva e de fácil utilização, dividida em etapas para melhor experiência do usuário.

## Características Principais

- **Interface de Usuário Moderna**: Design limpo e intuitivo usando Tailwind CSS e shadcn/ui
- **Formulário Multi-etapa**: Dividido em 3 seções lógicas (Dados Pessoais, Endereço e Contato)
- **Validação de Dados**: Validação de campos em tempo real com feedback visual
- **Máscaras de Input**: Formatação automática para CPF, RG, telefone e CEP
- **Preenchimento Automático de Endereço**: Busca automática de endereço a partir do CEP
- **Design Responsivo**: Adaptação para diferentes tamanhos de tela
- **Feedback Visual**: Notificações de sucesso, erro e indicadores de progresso

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces
- **TypeScript**: Superset tipado de JavaScript
- **Tailwind CSS**: Framework CSS utilitário
- **shadcn/ui**: Componentes de UI reutilizáveis
- **Vitest + Testing Library**: Framework para testes unitários
- **API ViaCEP**: Para busca de endereços por CEP

## Estrutura do Projeto

```
src/
├── components/            # Componentes React reutilizáveis
│   ├── FormField.tsx      # Campo de formulário com validação
│   ├── FormSection.tsx    # Seção de formulário com título e conteúdo
│   ├── PersonForm.tsx     # Formulário principal de cadastro
│   └── ui/                # Componentes de UI básicos (shadcn/ui)
├── hooks/
│   ├── useForm.tsx        # Hook personalizado para gerenciamento de formulários
│   └── use-mobile.tsx     # Hook para detectar dispositivos móveis
├── lib/
│   └── utils.ts           # Funções utilitárias gerais
├── pages/
│   ├── Index.tsx          # Página principal da aplicação
│   └── NotFound.tsx       # Página 404
├── utils/
│   ├── cepService.ts      # Serviço para busca de CEP
│   ├── masks.ts           # Funções para aplicar máscaras em inputs
│   └── validation.ts      # Funções de validação de campos
└── __tests__/             # Testes unitários
```

## Requisitos do Formulário

O sistema coleta as seguintes informações:

1. **Dados Pessoais**:
   - Nome Completo
   - Data de Nascimento
   - Nome da Mãe
   - RG
   - CPF

2. **Endereço**:
   - CEP (com preenchimento automático)
   - Logradouro
   - Número
   - Complemento (opcional)
   - Bairro
   - Cidade
   - Estado

3. **Contato**:
   - Telefone com DDD
   - E-mail

## Instalação e Execução

```bash
# Instalar dependências
npm install

# Executar em ambiente de desenvolvimento
npm run dev

# Executar testes
npm test

# Construir para produção
npm run build
```

## Testes

A aplicação possui testes unitários abrangentes para garantir o correto funcionamento de:

- Componentes do formulário
- Validações de campos
- Máscaras de formatação
- Serviço de busca de CEP
- Fluxo completo do formulário

## Implementação Futura

Este projeto frontend está preparado para integração com um backend utilizando:

- API RESTful para persistência dos dados
- Autenticação de usuários
- Gerenciamento de registros (listar, editar, excluir)
- Exportação de dados

## Licença

Este projeto está licenciado sob a licença MIT.
