# Angular V2

## Aula 95 - Formulários Reativos: Acesso ao FormControl no HTML e CSS de Validação dos Campos

À medida que construímos Formulários Reativos, saber como acessar o estado de um `FormControl` diretamente no template HTML, e como estilizar os campos de forma automatizada com base nas classes de estado do Angular, é essencial para entregar uma boa experiência de usuário (UX).

Diferente do Template-Driven (onde criávamos variáveis locais `#nome="ngModel"` em cada input), nos formulários reativos podemos acessar os controles de duas maneiras principais no template: utilizando o método direto do `FormGroup` ou criando getters facilitadores na classe TypeScript.

### 1. Formas de Acessar o FormControl no HTML

#### Abordagem Direta via `get()` no Template

Você pode chamar o método `get()` do grupo diretamente no HTML para inspecionar o controle:

```HTML
<div *ngIf="formulario.get('nome').invalid && formulario.get('nome').touched">
  O campo nome é obrigatório.
</div>
```

  - **Ponto negativo**: A expressão no HTML fica um pouco longa e repetitiva (`formulario.get('nome')...`).

#### Abordagem Limpa com Getters no TypeScript (Recomendada)

Para manter o HTML limpo e legível, a melhor prática é criar getters na classe do componente que retornam os controles individualmente:

```TypeScript
// No TypeScript
get nome() {
  return this.formulario.get('nome');
}
get email() {
  return this.formulario.get('email');
}
```

No template, a verificação se torna extremamente concisa:

```HTML
<div *ngIf="nome.invalid && nome.touched">
  O campo nome é obrigatório.
</div>
```

### 2. Estilização Automática via CSS (Classes Nativas do Angular)

O Angular adiciona automaticamente classes CSS aos elementos de formulário (`input`, `select`, `textarea`) com base nas interações do usuário e na validade dos dados. Essas classes são idênticas tanto em Template-Driven quanto em Reactive Forms:

| Estado do Controle | Se for Verdadeiro, Adiciona a Classe | Se for Falso, Adiciona a Classe |
| :--- | :--- | :--- |
| Modificação | `ng-dirty` | `ng-pristine` |
| Toque / Foco | `ng-touched` | `ng-untouched` |
| Validade | `ng-valid` | `ng-invalid` |

Podemos aproveitar essas classes no arquivo de estilos do componente para pintar a borda dos inputs automaticamente (vermelho para erros, verde para acertos), **sem precisar adicionar nenhuma lógica complexa no HTML**.

### 3. Exemplo Prático Completo

O Componente (`acesso-controle.component.ts`)

```TypeScript
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-acesso-controle',
  template: `
    <div style="margin: 20px; font-family: sans-serif;">
      <h2>Acesso ao FormControl e Estilização CSS (Reactive Forms)</h2>

      <form [formGroup]="formulario" (ngSubmit)="onSubmit()">
        
        <!-- Campo Nome -->
        <div style="margin-bottom: 15px;">
          <label>Nome Completo:</label><br>
          <!-- formControlName vincula ao controle 'nome' -->
          <input 
            type="text" 
            formControlName="nome" 
            style="width: 300px; padding: 6px;" />
          
          <!-- Usando o getter 'nome' definido no TypeScript -->
          <div *ngIf="nome.invalid && nome.touched" style="color: red; font-size: 12px; margin-top: 4px;">
            <div *ngIf="nome.errors?.required">O nome é obrigatório.</div>
            <div *ngIf="nome.errors?.minlength">Mínimo de 3 caracteres.</div>
          </div>
        </div>

        <!-- Campo E-mail -->
        <div style="margin-bottom: 15px;">
          <label>E-mail:</label><br>
          <input 
            type="email" 
            formControlName="email" 
            style="width: 300px; padding: 6px;" />
          
          <!-- Usando o getter 'email' definido no TypeScript -->
          <div *ngIf="email.invalid && email.touched" style="color: red; font-size: 12px; margin-top: 4px;">
            <div *ngIf="email.errors?.required">O e-mail é obrigatório.</div>
            <div *ngIf="email.errors?.email">E-mail inválido.</div>
          </div>
        </div>

        <button type="submit" [disabled]="!formulario.valid" style="padding: 8px 15px;">
          Enviar Dados
        </button>
      </form>
    </div>
  `,
  styles: [`
    /* Estilização automática utilizando as classes nativas geradas pelo Angular 2 */
    input.ng-invalid.ng-touched {
      border: 2px solid #a94442;
      background-color: #f2dede;
    }
    input.ng-valid.ng-touched {
      border: 2px solid #3c763d;
      background-color: #dff0d8;
    }
  `]
})
export class AcessoControleComponent implements OnInit {
  
  formulario: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formulario = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // Getters para facilitar o acesso aos controles diretamente no HTML
  get nome() {
    return this.formulario.get('nome');
  }

  get email() {
    return this.formulario.get('email');
  }

  onSubmit() {
    if (this.formulario.valid) {
      console.log('Enviado:', this.formulario.value);
      alert('Formulário enviado com sucesso!');
      this.formulario.reset();
    }
  }
}
```
