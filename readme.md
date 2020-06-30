# Instruções

## Passo a passo criação projeto node

Cria uma pasta com o nome do projeto

```sh
mkdir nome_pasta
```

Dentro da pasta inicializa o projeto node:

```sh
yarn init -y
```

Instalação das dependências iniciais do projeto:

- Express: para utilizar o rest;
- pg e pg-hstore: dependências postgres;
- sequelize: ORM para banco de dados;
- yup: validação de parâmetros;
- bcryptjs: criptografia de senhas;
- jsonwebtoken: token de autenticação;

Para instalar execute o seguinte comando:

```sh
yarn add express pg pg-hstore sequelize yup bcryptjs jsonwebtoken
```

Instalação das bibliotecas de desenvolvimento do projeto, sendo que essas libs não estarão presentes quando for feito o deploy:

- eslint: indicação de problemas no projeto, deve ser instalado também o plugin do ESLINT no VSCode;
- nodemon: permite reiniciar o projeto quando fizer uma alteração;
- prettier: atua com o eslint para deixar o código mais "bonito" com todas as regras que forem definidas;
- sequelize-cli: permite a criação mais facilitada de arquivos do sequelize;
- sucrase: interpretador de es6 para projetos node;

Para instalar execute o seguinte comando:

```sh
yarn add eslint nodemon prettier sequelize-cli sucrase -D
```

Com as primeiras libs instaladas
