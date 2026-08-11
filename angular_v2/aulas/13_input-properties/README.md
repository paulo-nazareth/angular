# Angular V2

## Aula 13 - Input Properties

No Angular, Input e Output são os mecanismos fundamentais para a comunicação entre componentes em uma relação de Pai para Filho (Parent to Child) e Filho para Pai (Child to Parent).

- `Input`: O componente pai envia dados para o componente filho.

- `Output`: O componente filho dispara eventos para notificar o componente pai sobre alguma ação.

Angular v2 (quando a versão baseada em TypeScript foi lançada após o AngularJS), a comunicação entre componentes dependia exclusivamente dos Decorators @Input() e @Output() em conjunto com a classe EventEmitter.

    Nota: O Input Properties possui um objetivo diferente das diretivas.

### 1. @Input() (Filho recebe dados do Pai)

Para expor uma propriedade que o componente pai possa preencher, importa-se o decorator `Input` do pacote `@angular/core`.

**Componente Filho** (user-card.component.ts)

```TypeScript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  template: `
    <div class="user-card">
      <h3>{{ name }}</h3>
      <p>Idade: {{ age }}</p>
    </div>
  `
})
export class UserCardComponent {
  // Recebe a propriedade 'name' do pai
  @Input() name: string;

  // Pode definir um valor padrão caso o pai não passe nada
  @Input() age: number = 0;
}
```

**Componente Pai** (app.component.ts)

No HTML do pai, a passagem de dados é feita via Property Binding usando colchetes `[propriedade]`:

```TypeScript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h2>Perfil do Usuário</h2>
    
    <!-- Passando valor estático para 'name' e dinâmico para 'age' -->
    <app-user-card [name]="usuarioNome" [age]="usuarioIdade"></app-user-card>
  `
})
export class AppComponent {
  usuarioNome: string = 'Maria Silva';
  usuarioIdade: number = 28;
}
```

### 3. Alias em @Input() (Sintaxe de Renomeação)

No Angular v2, era possível definir um nome público para a propriedade no template do pai diferente do nome interno da variável na classe do filho.

```TypeScript
export class UserCardComponent {
  // No HTML do pai usará [userName], mas internamente no filho a variável é 'name'
  @Input('userName') name: string;
}
```

### 4. Forma alternativa via Metadata do `@Component`

Além dos decorators, o Angular v2 permitia declarar os inputs e outputs diretamente dentro do objeto de metadados do `@Component` (embora usar decorators fosse a boa prática recomendada):

```TypeScript
@Component({
  selector: 'app-exemplo',
  template: `<p>{{ titulo }}</p>`,
  inputs: ['titulo'], // Equivalente a @Input() titulo: string;
})
export class ExemploComponent {
  titulo: string;
  aoSalvar = new EventEmitter<boolean>();
}
```

### Principais diferenças a ter em mente em projetos legados v2:

1. `NgModules` **OBRIGATÓRIOS**: No Angular v2, componentes não eram standalone. Todos os componentes que usavam `@Input` ou `@Output` precisavam estar obrigatoriamente declarados no array `declarations` de um `@NgModule` (geralmente o `AppModule`).

2. *Sem Signals ou APIs Funcionais*: Não existiam funções como `input()`, `output()` ou `model()`.

3. Uso de `EventEmitter` obrigatório: Diferente dos `output()` modernos que são emissores leves nativos, no legado a importação do `EventEmitter` do `@angular/core` era indispensável para enviar eventos.

## Angular 17+

### 1. Input Properties (Recebendo dados do Pai)

A propriedade Input permite que um componente receba valores passados pelo seu componente pai.

#### A) Sintaxe Moderna com Signals (`input()`) — Angular 17.1+ (Recomendado)

A API `input()` retorna um Signal somente leitura, tornando a reatividade mais performática e integrada com a estratégia de detecção de mudanças do Angular.

**Componente Filho** (`user-card.component.ts`):

```TypeScript
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  template: `
    <div class="card">
      <h3>{{ name() }}</h3>
      <p>Idade: {{ age() }}</p>
    </div>
  `
})
export class UserCardComponent {
  // Input obrigatório (se o pai não passar, dá erro de compilação)
  name = input.required<string>();

  // Input opcional com valor padrão
  age = input<number>(18);
}
```

**Componente Pai** (app.component.html):

```HTML
<!-- Passando valores estáticos ou dinâmicos via Property Binding [propriedade] -->
<app-user-card [name]="usuarioNome" [age]="usuarioIdade" />
```

#### B) Sintaxe Tradicional (@Input())

A sintaxe baseada em decorators ainda é amplamente utilizada em bases de código existentes.

```TypeScript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  template: `<h3>{{ name }}</h3>`
})
export class UserCardComponent {
  @Input({ required: true }) name!: string;
  @Input() age: number = 18;
}
```

### 3. Two-Way Data Binding com model() (Angular 17.2+)

Quando você precisa que um valor flua nas duas direções entre Pai e Filho (como um Input e Output combinados), o Angular introduziu os Model Signals.

**Componente Filho** (counter.component.ts):

```TypeScript
import { Component, model } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <button (click)="decrementar()">-</button>
    <span>{{ value() }}</span>
    <button (click)="incrementar()">+</button>
  `
})
export class CounterComponent {
  // Define que a propriedade permite Two-Way Binding
  value = model<number>(0);

  incrementar() {
    this.value.update(v => v + 1); // Atualiza no filho E no pai simultaneamente
  }

  decrementar() {
    this.value.update(v => v - 1);
  }
}
```

**Componente Pai** (app.component.html):

```HTML
<!-- Dupla sintaxe [(propriedade)] (Banana in a Box) -->
<app-counter [(value)]="totalContador" />
<p>Valor atual no pai: {{ totalContador() }}</p>
```

### Resumo Comparativo

| Funcionalidade | Sintaxe Tradicional | Sintaxe Moderna (Angular 17+) | Fluxo dos Dados |
| :--- | :--- | :--- | :--- |
| **Entrada de Dados** | `@Input()` | `input()` / `input.required()` | Pai → Filho |
| **Saída de Eventos** | `@Output()` + `EventEmitter` | `output()` | Filho → Pai |
| **Sincronização Dupla** | Custom `@Input` + `@Output` (`Change`) | model() | Pai ↔ Filho |