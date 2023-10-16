# shortlink

Encurtador de URL feito na live de 10/04/2023. Foi desenvolvido na seguinte stack:

- NextJS
- Typescript
- React
- Postgres

## Regex

Para validar o nome das URLs, fizemos uma regex. Você pode brincar com os testes aqui no [regex101](https://regex101.com/r/QHjDDs/1)

## Desenvolvimento

Este projeto está utilizando o [pnpm](https://pnpm.io/) como gerenciador de dependências, mas você pode utilizar o que preferir.

```shell
pnpm install
```

Com as dependências instaladas, agora basta copiar o arquivo `.env.example` para ter todas as variáveis de ambiente definidas e começar o desenvolvimento

```shell
cp .env.example .env
```

Agora é só subir o seu banco de dados com [docker-composer](https://docs.docker.com/compose/install/)

```shell
docker-compose up postgres
```

E por último, o server do nosso NextJS

```shell
pnpm dev
```

Pronto, seu servidor e banco estão online e você pode acessar `http://localhost:3000`.


## Testes

### Unidade

### TDD - Type Driven Development

### TDD - Test Driven Design

### Integração

