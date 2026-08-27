# Angular V2

## Aula 29 - Diretivas - ngClass

A diretiva `ngClass` no Angular 2 serve para adicionar ou remover classes CSS dinamicamente em um elemento HTML com base em expressões do seu código TypeScript (componente).

Para exemplificação da diretiva foi criado o componente `diretiva-ngclass`.

```bash
ng g c diretiva-ngclass
```

### Sintaxe Básica (Modo Objeto)

A forma mais comum de utilizar a `ngClass` é passando um objeto, onde:

- As chaves (`keys`) são os nomes das classes CSS.
- Os valores (`values`) são expressões que retornam true ou false.
```HTML
<button [ngClass]="{ 'btn-sucesso': ehValido, 'btn-desabilitado': !ehValido }">
  Enviar
</button>
```
- Se a variável `ehValido` do seu componente for `true`, o Angular aplica a classe `.btn-sucesso`.
- Se for `false`, aplica a classe `.btn-desabilitado`.

### Exemplo Completo

#### 1. Componente (`meu-componente.component.ts`)

```TypeScript
import { Component } from '@angular/core';

@Component({
  selector: 'app-exemplo',
  templateUrl: './meu-componente.component.html',
  styleUrls: ['./meu-componente.component.css']
})
export class MeuComponenteComponent {
  // Propriedades do componente
  ativo: boolean = true;
  tipoAlerta: string = 'sucesso'; // Pode ser 'sucesso', 'erro', 'alerta'

  alternarEstado() {
    this.ativo = !this.ativo;
  }
}
```

#### 2. Template HTML (`meu-componente.component.html`)

```HTML
<!-- Exemplo 1: Baseado em um boolean simples -->
<div [ngClass]="{ 'item-ativo': ativo, 'item-inativo': !ativo }">
  O status atual está: {{ ativo ? 'Ativo' : 'Inativo' }}
</div>

<button (click)="alternarEstado()">Alternar Estado</button>

<hr>

<!-- Exemplo 2: Usando expressões de comparação -->
<div [ngClass]="{
  'alerta-verde': tipoAlerta === 'sucesso',
  'alerta-vermelho': tipoAlerta === 'erro',
  'alerta-amarelo': tipoAlerta === 'alerta'
}">
  Mensagem do sistema
</div>
```

### Outras Formas de Usar a ngClass

#### Passando um Array de Classes

Aplica várias classes simultaneamente vindas de variáveis do TypeScript:

```HTML
<!-- Aplica as classes CSS contidas nas variáveis classe1 e classe2 -->
<div [ngClass]="[classe1, classe2]">Texto</div>
```

#### Passando uma String Direta

Util quando a variável no TypeScript contém exatamente o nome da classe:

```HTML
<div [ngClass]="nomeDaClasseCSS">Texto</div>
```

`ngClass` vs `class.nome-da-classe`

Para controlar apenas uma única classe, você também pode usar o Property Binding simples de classe:

```HTML
<!-- Adiciona a classe 'ativo' se a variável for true -->
<div [class.ativo]="ativo">Texto</div>
```

Use a `ngClass` sempre que precisar gerenciar duas ou mais classes condicionais no mesmo elemento HTML.