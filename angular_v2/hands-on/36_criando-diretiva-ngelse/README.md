# Angular V2

## Aula 36 - Criando uma Diretiva de Estrutura (ngElse)

Diretivas estruturais alteram a estrutura do DOM adicionando, removendo ou manipulando elementos HTML. Elas são identificadas pela sintaxe de asterisco (`*ngElse`), que o Angular converte internamente para a tag `<ng-template>`.

Para criar a diretiva `*ngElse` (o oposto do `*ngIf`), utilizam-se duas dependências principais:

- `TemplateRef`: Representa o conteúdo do `<ng-template>` que envolve a diretiva.
- `ViewContainerRef`: O container onde a visualização pode ser inserida ou removida do DOM.

#### Implementação da Diretiva ngElse

Para exemplificação foi criado a diretiva `g-else`.

```bash
# Criação da Diretiva
ng g d shared/ng-else
```

```TypeScript
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngElse]' // Nome que será usado com a sintaxe de asterisco *ngElse
})
export class ElseDirective<T = unknown> {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<T>,
    private viewContainer: ViewContainerRef
  ) {}

  // O nome do setter DEVE ser idêntico ao seletor da diretiva para funcionar com a sintaxe *
  @Input() set ngElse(condition: boolean) {
    // Se a condição for FALSA e o elemento ainda não estiver no DOM, ele é renderizado
    if (!condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } 
    // Se a condição for VERDADEIRA e o elemento estiver no DOM, ele é removido
    else if (condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
```

#### Como Utilizar no HTML

1. Sintaxe com Asterisco (Açúcar Sintático):

```HTML
<!-- Quando 'usuarioLogado' for FALSE, a mensagem será exibida -->
<div *ngElse="usuarioLogado">
  <p>Por favor, faça login para continuar.</p>
</div>
```

2. O que o Angular faz por baixo dos panos (Sintaxe Expandida):

```HTML
<ng-template [ngElse]="usuarioLogado">
  <div>
    <p>Por favor, faça login para continuar.</p>
  </div>
</ng-template>
```

#### Como Funciona o Fluxo Interno

| Elemento | Papel na Diretiva |
| :--- | :--- |
| `TemplateRef` | Mantém a referência do trecho HTML (blueprint) que deve ser renderizado. |
| `ViewContainerRef` | Funciona como uma âncora no DOM. O método `.createEmbeddedView()` adiciona o HTML e `.clear()` remove. |
| `hasView` | Flag de controle para evitar recriações desnecessárias da view a cada ciclo de detecção de mudanças. |