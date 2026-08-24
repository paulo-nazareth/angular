# Angular V2

## Aula 30 - Diretivas - ngStyle

A diretiva `ngStyle` no Angular 2 serve para aplicar estilos CSS inline dinamicamente a um elemento HTML, alterando propriedades como cor, tamanho de fonte, largura e exibição com base em expressões do seu componente TypeScript.

Para exemplificação da diretiva foi criado o componente `diretiva-ngclass`.

```bash
ng g c diretiva-ngstyle
```

### Sintaxe Básica (Modo Objeto)

A `ngStyle` recebe um objeto do TypeScript onde:

- As **chaves** (`keys`) são os nomes das propriedades CSS (em *camelCase* ou entre aspas com hífen).
- Os **valores** (`values`) são as variáveis ou expressões do seu componente que definem o valor do estilo.

```HTML
<div [ngStyle]="{ 'background-color': corDeFundo, 'font-size.px': tamanhoFonte }">
  Conteúdo formatado dinamicamente
</div>
```

Exemplo Completo no Angular 2

#### 1. Componente (`meu-componente.component.ts`)

```TypeScript
import { Component } from '@angular/core';

@Component({
  selector: 'app-exemplo-style',
  templateUrl: './meu-componente.component.html'
})
export class MeuComponenteComponent {
  corTexto: string = 'blue';
  tamanhoFonte: number = 18;
  comSucesso: boolean = true;

  aumentarFonte() {
    this.tamanhoFonte += 2;
  }

  alternarStatus() {
    this.comSucesso = !this.comSucesso;
  }
}
```

#### 2. Template HTML (meu-componente.component.html)

```HTML
<!-- Exemplo 1: Usando variáveis diretas -->
<p [ngStyle]="{ 'color': corTexto, 'font-size.px': tamanhoFonte }">
  Este texto altera de cor e tamanho dinamicamente.
</p>

<button (click)="aumentarFonte()">Aumentar Fonte</button>

<hr>

<!-- Exemplo 2: Operador ternário (condicional) -->
<div [ngStyle]="{
  'background-color': comSucesso ? '#d4edda' : '#f8d7da',
  'color': comSucesso ? '#155724' : '#721c24',
  'padding': '15px',
  'border-radius': '4px'
}">
  Status do Processo: {{ comSucesso ? 'Aprovado' : 'Reprovado' }}
</div>

<button (click)="alternarStatus()">Alternar Status</button>
```

#### Unidades de Medida Sintáticas (`.px`, `.em`, `%`)

No Angular 2, você pode anexar a unidade de medida diretamente na chave do objeto para não precisar concatenar strings no código:

```HTML
<!-- Sem sufixo (precisa concatenar a string 'px') -->
<div [ngStyle]="{ 'width': largura + 'px' }"></div>

<!-- Com sufixo de unidade direto no Angular -->
<div [ngStyle]="{ 'width.px': largura, 'font-size.pt': tamanho }"></div>
```

#### `ngStyle` vs `style.propriedade`

Para alterar apenas uma **única propriedade CSS**, você pode utilizar o *Property Binding* simples de estilo, mantendo o código mais limpo:

```HTML
<!-- Altera apenas a cor do texto -->
<p [style.color]="corTexto">Texto</p>

<!-- Altera apenas a largura com unidade em px -->
<div [style.width.px]="largura"></div>
```

Use a `ngStyle` sempre que precisar modificar múltiplas propriedades CSS de uma só vez no mesmo elemento.