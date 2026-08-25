# Angular V2

## Aula 32 - `ng-content`

O `<ng-content>` no Angular 2 é o mecanismo responsável pela **Projeção de Conteúdo** (*Content Projection*). Ele permite passar elementos HTML ou outros componentes do elemento pai diretamente para dentro do template do elemento filho.

É o equivalente no Angular ao tradicional conceito de "transclusão" ou aos slots do Web Components, sendo essencial para criar componentes reutilizáveis como painéis, modais, cards e abas.

Para exemplificação do **ng-content** foi criado o componente `ng-content`.

```bash
ng g c ng-content
```

### Exemplo Básico (Projeção Simples)

#### 1. Componente Filho (`card.component.ts`)

O filho define o layout visual e insere a tag `<ng-content></ng-content>` onde o conteúdo externo deve ser injetado.

```TypeScript
import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div class="card" style="border: 1px solid #ccc; padding: 15px;">
      <h3>Título Fixo do Card</h3>
      <div class="card-corpo">
        <!-- O conteúdo vindo do pai será renderizado AQUI -->
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class CardComponent {}
```

#### 2. Componente Pai (`app.component.html`)

O pai consome a tag `<app-card>` e escreve o HTML dentro dela.

```HTML
<app-card>
  <p>Este parágrafo foi escrito no componente PAI e injetado no FILHO!</p>
  <button>Clique aqui</button>
</app-card>
```

### Projeção Múltipla com `select` (Projeção Nomeada)

Você pode mapear múltiplos pontos de projeção usando o atributo `select` para organizar onde cada parte do HTML deve ir. O `select` aceita seletores CSS simples (tags, classes ou atributos).

#### 1. Componente Filho (`painel.component.ts`)

```TypeScript
import { Component } from '@angular/core';

@Component({
  selector: 'app-painel',
  template: `
    <div class="painel">
      <div class="painel-cabecalho">
        <ng-content select="[cabecalho]"></ng-content>
      </div>
      
      <div class="painel-corpo">
        <ng-content select="[corpo]"></ng-content>
      </div>

      <div class="painel-rodape">
        <!-- Pega qualquer outro elemento que sobrou e não possui atributo especifico -->
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class PainelComponent {}
```

#### 2. Componente Pai (`app.component.html`)

```HTML
<app-painel>
  <!-- Injetado no ng-content select="[cabecalho]" -->
  <h2 cabecalho>Título do Painel</h2>

  <!-- Injetado no ng-content select="[corpo]" -->
  <div corpo>
    <p>Texto e conteúdo principal do formulário ou relatório.</p>
  </div>

  <!-- Injetado no ng-content padrão (sem select) -->
  <button>Salvar</button>
</app-painel>
```

### Principais Casos de Uso

- **Componentes de Layout Reutilizáveis**: Modais, popups, caixas de diálogo, cards e accordeons.
- **Design Systems**: Estruturação de componentes de biblioteca onde o invólucro (estilo, borda, sombras) é fixo, mas a informação interna varia por tela.