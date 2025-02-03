# Portal Egressos Frontend

## Sobre
O **Portal Egressos Frontend** é uma aplicação web desenvolvida com **React, TypeScript e Vite**, voltada para a exibição e gerenciamento de dados de egressos. O projeto segue boas práticas de desenvolvimento, incluindo ESLint para análise estática de código e Husky para garantir a execução de hooks de pré-commit.

## Sumário
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Execução em Desenvolvimento](#execução-em-desenvolvimento)
- [Construção para Produção](#construção-para-produção)
- [Servindo a Aplicação em Produção](#servindo-a-aplicação-em-produção)
- [Ferramentas Adicionais](#ferramentas-adicionais)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Pré-requisitos
Antes de começar, certifique-se de ter os seguintes softwares instalados:

- [Node.js (versão LTS recomendada)](https://nodejs.org/)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

## Instalação
Siga os passos abaixo para configurar o projeto localmente:

```sh
# Clone este repositório
git clone https://github.com/seu-usuario/portal-egressos-frontend.git

# Acesse o diretório do projeto
cd portal-egressos-frontend

# Instale as dependências
npm install # ou yarn install
```

## Execução em Desenvolvimento
Para iniciar o servidor de desenvolvimento, utilize o comando:

```sh
npm run dev # ou yarn dev
```

A aplicação estará disponível em: **[http://localhost:5173](http://localhost:5173)**

## Construção para Produção
Para gerar um build otimizado do projeto, execute:

```sh
npm run build # ou yarn build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

## Ferramentas Adicionais
Este projeto utiliza ferramentas auxiliares para garantir qualidade e boas práticas:

### ESLint
Para verificar problemas de lint no código, execute:

```sh
npm run lint # ou yarn lint
```

### Husky
Husky é utilizado para executar hooks de pré-commit. Para habilitá-lo, rode:

```sh
npm run prepare
```

## Licença
Este projeto está licenciado sob a licença MIT. Para mais detalhes, consulte o arquivo [LICENSE](LICENSE).
