# Guiar de Atualização (Update Guide)

Atualizando a Versão do Angular 2.4 para Versão 4.0, com complexidade básica utilizando o sistema operacional Windows com o npm como gerenciados de pacotes.

### URL de Acesso

[https://angular.dev/update-guide?v=2.4-4.0&l=1](https://angular.dev/update-guide)

### Guia para atualizar sua aplicação Angular da versão 2.4 para a versão 4.0 para aplicações básicas.

**Nota**: Antes de atualizar, certifique-se de não usar `extends OnInit`, nem usar `extends` com nenhum evento de ciclo de vida. Em vez disso, use `implements <evento de ciclo de vida>`.

### Atualizando para Versão 4.0

Analise essas alterações e execute as ações necessárias para atualizar sua inscrição.

Se você utiliza animações em sua aplicação, você deve importar o `BrowserAnimationsModule` de `@angular/platform-browser/animations` no seu `NgModule` da aplicação.

Atualize todas as suas dependências para a versão mais recente do Angular e a versão correta do TypeScript. Se você estiver usando o Windows, pode usar:

```bash
npm install @angular/animations@^4.0.0 @angular/common@^4.0.0 @angular/compiler@^4.0.0 @angular/compiler-cli@^4.0.0 @angular/core@^4.0.0 @angular/forms@^4.0.0 @angular/http@^4.0.0 @angular/platform-browser@^4.0.0 @angular/platform-browser-dynamic@^4.0.0 @angular/platform-server@^4.0.0 @angular/router@^4.0.0 typescript@'>=2.1.0 <2.4.0'
```

### Após a Atualização

Renomeie suas tags de modelo para `ng-template`.

Substitua os componentes `downgradeComponent`, `downgradeInjectable`, `UpgradeComponent` e `UpgradeModule` importados de `@angular/upgrade`. Em vez disso, use as novas versões em `@angular/upgrade/static`.