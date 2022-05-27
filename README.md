<h1 align="center"> Health-Inn - API </h1>

<div align="center">

[Introdução](#-Introdução)
| [Tecnologias usadas](#-Tecnologias-usadas)
| [Requisitos mínimos](#-Requisitos-mínimos-para-rodar-o-projeto-localmente)
| [Como utilizar](#-Como-utilizar-localmente)

Projeto construído com conhecimentos em Node.js, Typescript e alguns patterns como SOLID, DDD e TDD.

</div>

---

# 👨🏻‍💻 Introdução

## Objetivo

Realizar o [teste técnico proposta](./docs/README.md) pela Onyma.

## Esse repositório possui

Construção de uma API para a aplicação **Health-Inn**, em que será possível cadastrar empresas e funcionários.

## Projeto

Para utilizar documentação de referência no insomnia basta clicar no batão abaixo

<div align="center">

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Health-Inn-API&uri=https%3A%2F%2Fgithub.com%2Fmanfrinmm%2Fdesafio-onyma-api%2Fblob%2Fmaster%2Fdocs%2FTemplate_Insomnia.json)

</div>

# 🚀 Tecnologias usadas

- [NodeJs](https://nodejs.org)
- [Typescript](https://www.typescriptlang.org)
- [Express](https://expressjs.com)
- [Typeorm](https://typeorm.io/#/)
- [PostgreSQL](https://www.postgresql.org/)
- [Jest](https://jestjs.io/)
- [Eslint](https://eslint.org/)
- [Docker](https://www.docker.com/)

# 📋 Requisitos mínimos para rodar o projeto localmente

- NodeJs instalado na versão 12.x ou superior
- Docker e Docker compose (opcional)
- Gerenciador de pacotes do Node, [Npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/).
- Ter uma instância do PostgreSQL para que o typeorm possa se conectar

# 🤹‍♂️ Como utilizar localmente

- Clone o repositório:

  ```bash
  git clone https://github.com/manfrinmm/desafio-onyma-api
  ```

- Abra o terminal na pasta do projeto

- Instale as dependências:

  Via yarn

  ```bash
    yarn
  ```

  ou via npm

  ```bash
    npm install
  ```

- Renomeie o arquivo `.env.example` para `.env` e edite suas variáveis ambientes

- Iniciando o servidor:

  - Via docker

    ```bash
      docker-compose up -d
    ```

    Nesse método uma instância do PostgreSQL e do servidor já é criado.

    A porta do servidor será aquela utilizada no arquivo `.env`

  - Via terminal:

    Via yarn

    ```bash
      yarn dev
    ```

    ou via npm

    ```bash
      npm run dev
    ```

    Esse método é necessário ter uma instância do PostgreSQL já configurada e com credenciais inseridas dentro do arquivo `.env`

- Rodando as migrations:

  Via yarn

  ```bash
    yarn typeorm migration:run
  ```

  ou via npm

  ```bash
    npm run typeorm migration:run
  ```

- A partir daqui sua API já deve estar funcionando (☞ ﾟヮﾟ)☞

- Para rodar os testes:

  Via yarn

  ```bash
    yarn test
  ```

  ou via npm

  ```bash
    npm run test
  ```

---

Made by Matheus Menezes Manfrin [See my LinkedIn](https://www.linkedin.com/in/manfrinmm)
