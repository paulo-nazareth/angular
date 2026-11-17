# Guiar de Atualização (Update Guide)

Para o Angular 6, você precisará abandonar o Node v6/v8 e migrar para versões intermediárias mais robustas:

Versão recomendada: Node.js v10.x (LTS - Dubnium) ou, no máximo. Utilizarei a versão 10.9.0 (npm 6.2.0).

Link para Download da Versão: https://nodejs.org/download/release/v10.9.0/

Atualizando a Versão do Angular 4.4 para Versão 6.1, com complexidade básica utilizando o sistema operacional Windows com o npm como gerenciados de pacotes.

### URL de Acesso

[https://angular.dev/update-guide?v=4.4-6.1&l=1](https://angular.dev/update-guide)

        **Nota**: Certifique-se de seguir o guia abaixo para migrar seu aplicativo para a nova versão. Não é possível executar o comando `ng update` para atualizar aplicativos Angular em mais de uma versão principal por vez.

### Guia para atualizar sua aplicação Angular da versão 4.4 para a versão 6.1 para aplicações básicas.

#### Antes de Atualizar

1. Renomeie suas tags de modelo para ng-template.
2. Substitua os componentes `downgradeComponent`, `downgradeInjectable`, `UpgradeComponent` e `UpgradeModule` importados de `@angular/upgrade`. Em vez disso, use as novas versões em `@angular/upgrade/static`.
3. Se você utiliza o `HttpModule` legado e o serviço `Http`, migre para o `HttpClientModule` e o serviço `HttpClient`. O `HttpClient` simplifica a ergonomia padrão (você não precisa mais mapear para JSON) e agora oferece suporte a valores de retorno tipados e interceptadores.

### Atualize para a nova versão

Analise essas alterações e execute as ações necessárias para atualizar sua inscrição.

- Se você depende de pipes para data, moeda, decimal ou porcentagem, na versão 5 você verá pequenas alterações no formato. Para aplicações que utilizam idiomas diferentes de **en-us**, você precisará importá-lo e, opcionalmente, `locale_extended_fr` de `@angular/common/i18n_data/locale_fr` e `registerLocaleData(local)`.
- Certifique-se de estar usando o **Node 8 ou superior**.
- Atualize seu Angular CLI e migre a configuração para o novo formato `angular.json` executando o seguinte comando:
    ```bash
    cmd /C "set "NG_DISABLE_VERSION_CHECK=1" && npx @angular/cli@^6.2.9 update @angular/cli@^6.2.9 @angular/core@^6.2.9"
    ```
- Atualize todos os pacotes do framework Angular para a versão 6 e utilize a versão correta do RxJS e do TypeScript.
    ```bash
    cmd /C "set "NG_DISABLE_VERSION_CHECK=1" && npx @angular/cli@^6.2.9 update @angular/cli@^6.2.9 @angular/core@^6.2.9"
    ```
    Após a atualização, o TypeScript e o RxJS irão distribuir os tipos de forma mais precisa em sua aplicação, o que pode expor erros existentes nas tipagens da sua aplicação.

Infelizmente o comando acima não funcionou...

Apesar de sugerido em alguns sites, não existe estas versões no npm.

```bash
npm install @angular/animations@^6.2.9 @angular/common@^6.2.9 @angular/compiler@^6.2.9 @angular/compiler-cli@^6.2.9 @angular/core@^6.2.9 @angular/forms@^6.2.9 @angular/http@^6.2.9 @angular/platform-browser@^6.2.9 @angular/platform-browser-dynamic@^6.2.9 @angular/platform-server@^6.2.9 @angular/router@^6.2.9 typescript@'>=2.7.2 <2.8.10'
```

```bash
npm install @angular/animations@^6.1.10 @angular/common@^6.1.10 @angular/compiler@^6.1.10 @angular/compiler-cli@^6.1.10 @angular/core@^6.1.10 @angular/forms@^6.1.10 @angular/http@^6.1.10 @angular/platform-browser@^6.1.10 @angular/platform-browser-dynamic@^6.1.10 @angular/platform-server@^6.1.10 @angular/router@^6.1.10 typescript@">=2.7.2 <2.8.10"
```

### Após a atualização

Remova recursos obsoletos do RxJS 5 usando regras de atualização automática do rxjs-tslint.

Para a maioria das aplicações, isso significará executar os dois comandos a seguir:

```bash
npx rxjs-tslint rxjs-5-to-6-migrate -p src/tsconfig.app.json
```
