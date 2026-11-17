# Guiar de Atualização (Update Guide)

### Atualização Conforme o Guia angular.dev

Atualizando a Versão do Angular 4.4 para Versão 5.2, com complexidade básica utilizando o sistema operacional Windows com o npm como gerenciados de pacotes.

Versão recomendada: Node.js v6.9.0 ou 8.9.0

```bash
# Versão Angular CLI (Recomendada)
npm install -g angular-cli@1.0.0-beta.28.3
```

Link para Download da Versão: https://nodejs.org/download/release/v8.9.4/

### URL de Acesso

[https://angular.dev/update-guide?v=4.4-5.2&l=1](https://angular.dev/update-guide)

### Guia para atualizar sua aplicação Angular da versão 4.4 para a versão 5.2 para aplicações básicas.

#### Antes de Atualizar

1. Renomeie suas tags de modelo para ng-template.
2. Substitua os componentes `downgradeComponent`, `downgradeInjectable`, `UpgradeComponent` e `UpgradeModule` importados de `@angular/upgrade`. Em vez disso, use as novas versões em `@angular/upgrade/static`.
3. Se você utiliza o `HttpModule` legado e o serviço `Http`, migre para o `HttpClientModule` e o serviço `HttpClient`. O `HttpClient` simplifica a ergonomia padrão (você não precisa mais mapear para JSON) e agora oferece suporte a valores de retorno tipados e interceptadores. Leia mais em angular.dev.

### Atualize para a nova versão

Analise essas alterações e execute as ações necessárias para atualizar sua inscrição.

- Se você depende de pipes para data, moeda, decimal ou porcentagem, na versão 5 você verá pequenas alterações no formato. Para aplicações que utilizam idiomas diferentes de **en-us**, você precisará importá-lo e, opcionalmente, `locale_extended_fr` de `@angular/common/i18n_data/locale_fr` e `registerLocaleData(local)`.
- Atualize todas as suas dependências para a versão mais recente do Angular e a versão correta do TypeScript. Se você estiver usando o Windows, pode usar:

```bash
npm install @angular/animations@^5.2.0 @angular/common@^5.2.0 @angular/compiler@^5.2.0 @angular/compiler-cli@^5.2.0 @angular/core@^5.2.0 @angular/forms@^5.2.0 @angular/http@^5.2.0 @angular/platform-browser@^5.2.0 @angular/platform-browser-dynamic@^5.2.0 @angular/platform-server@^5.2.0 @angular/router@^5.2.0 typescript@2.4.2 rxjs@^5.5.2
```
### Após a atualização

Você não precisa fazer nada depois de alternar entre essas versões.

Contudo, identificado a necessidade de atualizar o `rxjs`.

```bash
npm install rxjs@5.5.12 --save
```









