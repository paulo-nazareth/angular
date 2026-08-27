# Angular V2

## Aula 16 - Acesso ao DOM e ao Template com ViewChild

No Angular, a forma padrão de interagir com o HTML é através da vinculação de dados (Data Binding). No entanto, existem casos em que você precisa acessar elementos do DOM ou componentes filhos diretamente no TypeScript, por exemplo, para focar em um campo de formulário, tocar um vídeo ou invocar um método público de um componente filho.

Para isso, o Angular fornece a mecânica do `ViewChild`.

### 1. O que é o ViewChild?

O `@ViewChild` (ou a função `viewChild()` moderna) é um decorator ou função que procura e injeta na classe do componente a referência de:

1. Um Elemento do DOM (através de uma variável de referência de template, ex: `#meuElemento`).
2. Um Componente Filho ou Diretiva presente no template.

### 2. Acessando Elementos do DOM (HTML)

Para acessar uma tag HTML direta no TypeScript, você define uma variável de referência no template usando `#` no HTML.

- A) Sintaxe Moderna com Signals (`viewChild()`) — Angular 17.2+ (Recomendado)

  A nova função `viewChild()` retorna a referência dentro de um Signal, garantindo tipagem forte e reatividade nativa.

    Template (`busca.component.html`):

  ```HTML
  <!-- A tag #campoInput cria a variável de referência -->
  <input #campoInput type="text" placeholder="Digite sua busca...">
  <button (click)="focarCampo()">Focar no Campo</button>
  ```
    TypeScript (`busca.component.ts`):

  ```TypeScript
  import { Component, viewChild, ElementRef } from '@angular/core';

  @Component({
    selector: 'app-busca',
    standalone: true,
    templateUrl: './busca.component.html'
  })
  export class BuscaComponent {
    // Captura o elemento via variável de referência #campoInput
    // O tipo retornado dentro do Signal é ElementRef<HTMLInputElement>
    inputEl = viewChild<ElementRef<HTMLInputElement>>('campoInput');

    focarCampo() {
      // Acessa o Signal .nativeElement para interagir diretamente com o DOM nativo
      this.inputEl()?.nativeElement.focus();
    }
  }
  ```
- B) Sintaxe Tradicional com Decorator (`@ViewChild`)

  Na sintaxe tradicional, a propriedade é preenchida no hook do ciclo de vida ngAfterViewInit(), pois é o momento em que a DOM está completamente renderizada.

  ```TypeScript
  import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

  @Component({
    selector: 'app-busca',
    standalone: true,
    template: `
      <input #campoInput type="text" placeholder="Digite sua busca...">
      <button (click)="focarCampo()">Focar no Campo</button>
    `
  })
  export class BuscaComponent implements AfterViewInit {
    // Captura o elemento do HTML
    @ViewChild('campoInput') inputEl!: ElementRef<HTMLInputElement>;

    ngAfterViewInit() {
      // Apenas após a view ser inicializada o elemento está disponível
      console.log('Input carregado na DOM:', this.inputEl.nativeElement);
    }

    focarCampo() {
      this.inputEl.nativeElement.focus();
    }
  }
  ```

### 3. Acessando Componentes Filhos

O ViewChild também pode ser usado para obter a instância de um componente filho e chamar seus métodos ou ler suas variáveis públicas diretamente.

**Componente Filho** (`contador.component.ts`):

```TypeScript
@Component({
  selector: 'app-contador',
  standalone: true,
  template: `<h3>Contagem: {{ valor }}</h3>`
})
export class ContadorComponent {
  valor = 0;

  incrementar() {
    this.valor++;
  }
}
```

**Componente Pai** (`app.component.ts`):

```TypeScript
import { Component, viewChild } from '@angular/core';
import { ContadorComponent } from './contador.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContadorComponent],
  template: `
    <!-- Renderiza o componente filho -->
    <app-contador />
    
    <!-- Botão no pai controlando o filho -->
    <button (click)="incrementarFilho()">Incrementar Filho via Pai</button>
  `
})
export class AppComponent {
  // Passa diretamente a classe do componente em vez de uma string
  contadorFilho = viewChild(ContadorComponent);

  incrementarFilho() {
    // Chama o método 'incrementar()' diretamente da instância do filho
    this.contadorFilho()?.incrementar();
  }
}
```

### 4. ViewChild vs ViewChildren

Se você precisa capturar múltiplos elementos ou componentes (por exemplo, os itens de uma lista renderizada com `@for`), utilize o `ViewChildren` / `viewChildren()`.

```TypeScript
import { Component, viewChildren, ElementRef } from '@angular/core';

@Component({
  standalone: true,
  template: `
    @for (item of itens; track $index) {
      <li #itemLista>{{ item }}</li>
    }
  `
})
export class ListaComponent {
  itens = ['Item 1', 'Item 2', 'Item 3'];

  // Retorna um Signal contendo um array de ElementRef
  itensLista = viewChildren<ElementRef<HTMLLIElement>>('itemLista');

  mudarCores() {
    this.itensLista().forEach(el => {
      el.nativeElement.style.color = 'blue';
    });
  }
}
```

### 5. Boas Práticas e Cuidados ao Usar ViewChild

- **Evite manipulação excessiva do DOM**: Sempre que possível, prefira controlar o visual e comportamento através de Property Binding (`[class]`, `[style]`, `[disabled]`) ou Signals, em vez de alterar estilos manualmente via nativeElement.style.
- **Ciclo de Vida**: Com a sintaxe tradicional `@ViewChild`, nunca tente acessar a variável dentro do `ngOnInit()`, pois a view ainda não existe nesse momento. A variável estará *undefined*. O acesso só é seguro a partir do `ngAfterViewInit()`.
- **Opção static (Sintaxe Antiga)**: No decorator `@ViewChild('ref', { static: true })`, a propriedade é inicializada no `ngOnInit()`, mas isso só funciona se o elemento NÃO estiver envelopado por diretivas condicionais como `*ngIf` ou `@if`.