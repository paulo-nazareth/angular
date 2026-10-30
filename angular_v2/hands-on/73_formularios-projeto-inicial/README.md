# Angular V2

## Aula 73 - Formulários - Criando o projeto inicial com Bootstrap 3

As próximas aulas serão aplicadas no projeto `Forms`, criado a partir do comando abaixo:

```bash
# Criação do Projeto
ng new forms --routing --style-scss --skip-install
```

Também será instalado o Bootstrap versão 3, foi necessário informar a versão diretamente no arquivo `package.json`

```bash
# Comando para Instalaçaõ do Bootstrap (versão corrente)
npm install ngx-bootstrap@1.6.6 bootstrap@3.3.7 --save
```

    **Nota**: Na instação através do comando acima, foram instalados `bootstrap@3.3.7`, `ngx-bootstrap@1.6.6` e `moment@2.18.1`

Configurações necessárias para o arquivo `angular-cli.json`

```TypeScript
  "styles": [
    "../node_modules/bootstrap/dist/css/bootstrap.min.css",
    "styles.css"
  ]
```

#### Link Documentação

[https://github.com/valor-software/ngx-bootstrap/tree/v3.3.0](https://github.com/valor-software/ngx-bootstrap/tree/v3.3.0#installation-instructions)

Também será criado dois componentes:

```bash
# Criação do Componente template-form
ng g c template-form

# Criação do Componente data-form
ng g c data-form
```
