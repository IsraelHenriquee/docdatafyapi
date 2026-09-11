# Documentação da Datafy API

Site de documentação feito com [Mintlify](https://mintlify.com).

## Rodar localmente

Precisa de Node.js 20.17 ou mais novo.

```bash
npm i -g mint
mint dev
```

A prévia abre no navegador e atualiza enquanto você edita os arquivos.

Antes de publicar, confira se o build está sem erros:

```bash
mint validate
```

## Publicar

Todo commit na branch `main` publica o site automaticamente pelo app do Mintlify no GitHub.

## Estrutura

- `docs.json`: nome, cores, menu e abas
- `*.mdx`: páginas
- A aba "Referência da API" lê `https://app.datafyapi.com.br/openapi.json`
