# CNPJ Validator

**CNPJ Validator** é uma ferramenta de linha de comando (CLI) desenvolvida em TypeScript para validar números de CNPJ (Cadastro Nacional da Pessoa Jurídica) no Brasil.

## 📝 Descrição do Projeto

O objetivo deste projeto é fornecer uma maneira rápida e confiável de verificar se um determinado CNPJ é válido ou não, aplicando os pesos e o cálculo dos dígitos verificadores conforme as regras oficiais.

## 🎯 Funcionalidades

- Remoção de caracteres não numéricos de entradas.
- Verificação de sequências de dígitos repetidos (ex.: `00000000000000`).
- Cálculo dos dois dígitos verificadores com base em pesos predefinidos.
- Mensagem de saída indicando se o CNPJ informado é válido ou inválido.

## 🚀 Tecnologias Utilizadas

- Node.js
- TypeScript
- readline/promises

## 📦 Estrutura do Projeto

```text
cnpj-validator
├── src
│   ├── index.ts            # Ponto de entrada da aplicação
│   └── util
│       ├── constants.ts    # Expressões regulares e pesos para cálculo
│       └── readline.ts     # Abstração do readline usando promises
├── tsconfig.json           # Configurações do TypeScript
├── package.json            # Dependências e scripts do NPM
└── README.md               # Documento de apresentação e instruções (este arquivo)
```

## ⚙️ Pré-requisitos

- [Node.js](https://nodejs.org/) v16 ou superior
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## 💻 Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/Fer-Magalhaes/cnpj-validator.git
   cd cnpj-validator
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

## 🛠️ Scripts Disponíveis

- `dev`: Executa o código diretamente com `tsx`, ideal para desenvolvimento.
- `build`: Compila o projeto TypeScript em JavaScript na pasta `dist`.
- `start`: Executa o código compilado em produção (`node dist/index.js`).
- `viewer`: Inicia o modo `ts-node` no diretório `src/viewer` (para monitoramento ou interface adicional).
- `test`: Executa a suíte de testes com Vitest.

## 🚀 Como Usar

1. Em modo de desenvolvimento:

   ```bash
   npm run dev
   ```

   - Ao executar, será solicitado que você digite um CNPJ. Exemplo:
     ```
     Digite o CNPJ: 12.345.678/0001-95
     O CNPJ 12.345.678/0001-95 é válido.
     ```

## 🧩 Lógica de Validação

1. **Limpeza da entrada**: Remove todos os caracteres não numéricos.
2. **Verificação inicial**: Confere se existem 14 dígitos e elimina sequências repetidas.
3. **Cálculo dos dígitos verificadores**:
   - Utiliza dois vetores de pesos (`WEIGHTS_FIRST_CHECK` e `WEIGHTS_SECOND_CHECK`).
   - Aplica multiplicação de cada dígito pelo peso correspondente, soma os resultados e calcula o módulo 11.
   - Determina cada dígito verificador conforme as regras (se resto < 2, dígito = 0; caso contrário, dígito = 11 - resto).
4. **Comparação**: Compara os dígitos calculados com os dois últimos dígitos do CNPJ fornecido.

## 🤝 Contribuição

1. Fork no repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`).
3. Faça suas alterações e commite-as (`git commit -m 'Adicionar nova funcionalidade'`).
4. Abra um Pull Request.

## 📄 Licença

Este projeto está licenciado sob os termos da [MIT License](./LICENSE).




