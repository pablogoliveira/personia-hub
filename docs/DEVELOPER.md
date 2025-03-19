
# Documentação de Desenvolvimento

Este documento descreve os detalhes técnicos e padrões de desenvolvimento do Sistema de Cadastro de Pessoas.

## Arquitetura

A aplicação segue uma arquitetura de componentes React e é organizada em módulos funcionais:

1. **Componentes**: Elementos reutilizáveis da UI
2. **Hooks**: Lógica de estado e comportamento reutilizável
3. **Utilidades**: Funções auxiliares para validação, máscaras e serviços
4. **Páginas**: Componentes de nível superior que representam rotas

## Padrões de Código

### Convenções de Nomenclatura

- **Componentes**: PascalCase (ex: `FormField.tsx`)
- **Hooks**: camelCase com prefixo "use" (ex: `useForm.tsx`)
- **Utilitários**: camelCase (ex: `validation.ts`)
- **Interfaces/Types**: PascalCase com nome descritivo (ex: `PersonFormData`)

### Estrutura de Componentes

Os componentes seguem um padrão comum:

1. Importações
2. Definição de interfaces/tipos
3. Definição do componente (função)
4. Lógica interna e hooks
5. Renderização (JSX)
6. Exportação

### Estilização

- Uso prioritário de classes Tailwind CSS
- Componentes de UI do shadcn/ui como base
- Customizações via `cn` utility para combinar classes

## Formulário Principal

O componente `PersonForm` é o coração da aplicação e implementa:

### Gerenciamento de Estado

- Etapas do formulário através de `formStep`
- Estado de submissão e sucesso
- Integração com o hook personalizado `useForm` para:
  - Valores dos campos
  - Validação
  - Tratamento de erros
  - Submissão

### Validação

A validação de campos é realizada em vários níveis:

1. **Em tempo real**: Durante digitação e perda de foco
2. **Na transição entre etapas**: Validação em lote dos campos da etapa atual
3. **Na submissão**: Validação final de todos os campos

### Formatação de Campos

Máscaras são aplicadas para melhorar a experiência do usuário:

- CPF: 000.000.000-00
- RG: 00.000.000-0
- Telefone: (00) 00000-0000
- CEP: 00000-000

### Busca de CEP

O serviço de CEP implementa:

1. Limpeza do input (remove caracteres não numéricos)
2. Validação do formato (8 dígitos)
3. Requisição para a API ViaCEP
4. Tratamento de respostas e erros
5. Preenchimento automático dos campos de endereço

## Hook `useForm`

Este hook personalizado implementa:

- Gerenciamento dos valores do formulário
- Rastreamento de campos "tocados" (que receberam interação)
- Validação de campos
- Lógica de submissão
- Gerenciamento de estado de submissão

## Testes

A aplicação utiliza Vitest e React Testing Library para testes:

- **Testes de Componentes**: Renderização, interações e estados
- **Testes de Validação**: Funções de validação para diferentes tipos de dados
- **Testes de Máscaras**: Formatação correta de inputs
- **Testes de Serviços**: Funcionamento do serviço de CEP
- **Testes de Integração**: Fluxo completo do formulário

## Melhores Práticas Implementadas

1. **Componentização**: Componentes pequenos e focados
2. **Separação de Responsabilidades**: UI, lógica e serviços separados
3. **Hooks Personalizados**: Extração de lógica reutilizável
4. **Validação Robusta**: Verificações detalhadas de dados
5. **Feedback ao Usuário**: Notificações e indicadores visuais claros
6. **Acessibilidade**: Labels adequados e navegação por teclado
7. **Design Responsivo**: Adaptação para diferentes dispositivos
8. **Testes Abrangentes**: Cobertura de todos os aspectos críticos

## Fluxo do Formulário

1. **Etapa 1 - Dados Pessoais**:
   - Preenchimento de informações básicas
   - Validação ao tentar avançar
   - Transição para próxima etapa

2. **Etapa 2 - Endereço**:
   - Preenchimento do CEP com busca automática
   - Complemento de informações de endereço
   - Validação ao tentar avançar
   - Transição para próxima etapa

3. **Etapa 3 - Contato**:
   - Preenchimento de informações de contato
   - Validação final
   - Submissão do formulário
   - Exibição de feedback de sucesso

## Gerenciamento de Erros

A aplicação implementa múltiplas camadas de tratamento de erros:

1. **Validação em Tempo Real**: Feedback imediato durante digitação
2. **Mensagens Específicas**: Indicações claras do problema
3. **Prevenção de Submissão Inválida**: Botões desabilitados quando apropriado
4. **Notificações Toast**: Alertas para erros de sistema ou validação
5. **Fallbacks**: Comportamento gracioso em caso de falhas de serviços

## Considerações de Performance

- Uso eficiente de re-renderizações
- Validação otimizada
- Requisições de rede controladas
- Feedback visual para operações assíncronas
