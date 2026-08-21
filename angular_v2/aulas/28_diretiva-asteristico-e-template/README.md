# Angular V2

## Aula 28 - Diretivas - Sobre o Asterisco e Template

No Angular, o asterisco (`*`) e a tag `<ng-template>` estão intimamente ligados. O asterisco é um recurso de sintaxe (*syntactic sugar*) projetado para simplificar a escrita de diretivas estruturais (`*ngIf`, `*ngFor`, `*ngSwitchCase`).

Quando você coloca um `*` na frente de uma diretiva, você está instruindo o compilador do Angular a expandir e transformar aquele elemento HTML em um `<ng-template>` por baixo dos panos.

### 1. O que é o `<ng-template>`?

O `<ng-template>` é um elemento do Angular usado para declarar blocos de HTML que **não são renderizados imediatamente** no navegador.

- Por padrão, o conteúdo dentro de um `<ng-template>` fica "invisível" e não gera nenhuma tag HTML na árvore do DOM.
- Ele funciona como um gabarito (modelo) que só é inserido no DOM fisicamente quando uma diretiva estrutural aciona a sua renderização.

### 2. O Desaçucaramento (Desugaring) do Asterisco

Para entender o que o Angular faz quando encontra o `*`, veja como o código escrito por você é transformado pelo compilador:

#### Exemplo 1: `*ngIf`

Como você escreve:

```HTML
<div *ngIf="exibirMensagem" class="alerta">
  Operação realizada com sucesso!
</div>
```

Como o Angular transforma internamente:

```HTML
<ng-template [ngIf]="exibirMensagem">
  <div class="alerta">
    Operação realizada com sucesso!
  </div>
</ng-template>
```

#### Exemplo 2: *ngFor

Como você escreve:

```HTML
<li *ngFor="let curso of cursos; let i = index">
  {{ i }} - {{ curso }}
</li>
```

Como o Angular transforma internamente:

```HTML
<ng-template ngFor let-curso [ngForOf]="cursos" let-i="index">
  <li>
    {{ i }} - {{ curso }}
  </li>
</ng-template>
```

    O que mudou aqui?

    - O atributo `let-curso` cria uma variável local para cada item da iteração.
    - A sintaxe `of cursos` vira o property binding `[ngForOf]="cursos"`.
    - O elemento `<li>` passa a ser o conteúdo interno do `<ng-template>`.

### 3. Por que o Angular usa esse mecanismo?

As diretivas estruturais precisam ter o poder de criar, remover e duplicar nós do DOM.

Para que o Angular consiga fazer isso sem corromper a árvore de renderização do navegador, ele empacota todo o bloco de código dentro de um `TemplateRef` (uma referência ao modelo `<ng-template>`). A partir daí, a diretiva decide através do `ViewContainerRef` onde e quando injetar ou remover aquele trecho de código HTML.

### 4. Quando usar o `<ng-template>` diretamente?

Apesar de o `*` ocultar o uso do `<ng-template>`, há cenários no Angular em que você precisa escrever a tag `<ng-template>` de forma explícita:

#### 1. Blocos de `else` no `*ngIf` (a partir do Angular 4)

```HTML
<div *ngIf="usuarioLogado; else blocoDeslogado">
  Bem-vindo de volta!
</div>

<ng-template #blocoDeslogado>
  <p>Por favor, faça login para continuar.</p>
</ng-template>
```

#### 2. Substituição de Conteúdo e Visões Dinâmicas

Ao construir componentes reutilizáveis (como modais, abas ou tabelas avançadas), você pode passar um `<ng-template>` como parâmetro via `@ContentChild` para definir como uma célula ou cabeçalho deve ser estilizado.