# Angular V2

## Aula 77 - Forms (template driven) Aplicando Validação nos Campos

No ecossistema do Angular Versão 2, a validação em formulários **Template-Driven** é construída combinando os atributos de validação nativos do HTML5 (`required`, `minlength`, `maxlength`, `pattern`) com as diretivas e estados rastreados pelo Angular (como o `ngModel` e o `ngForm`).

O Angular intercepta esses atributos automaticamente, transforma-os em regras de validação e atualiza o estado e as classes CSS do elemento em tempo real.

### Como Funciona a Validação Template-Driven

1. **Atributos HTML5**: Você adiciona regras diretamente no input (ex: `required`, `minlength="4"`).
2. **Variáveis de Referência de Template**: Você cria uma variável apontando para o controle (`#nomeInput="ngModel"`) para inspecionar o estado específico daquele campo.
3. **Classes CSS Automáticas**: O Angular injeta dinamicamente classes no elemento HTML conforme a interação do usuário:
  - `ng-untouched` / `ng-touched` (se o campo perdeu o foco / foi tocado).
  - `ng-pristine` / `ng-dirty` (se o valor foi alterado ou não).
  - `ng-valid` / `ng-invalid` (se o campo atende ou não às regras de validação).

### Exemplo Prático Completo com Validações

Vamos criar um formulário de cadastro onde aplicamos validações de preenchimento obrigatório, tamanho mínimo e formato de e-mail, exibindo mensagens de erro condicionais.

1. O Componente (`cadastro-validado.component.ts`)

```TypeScript
import { Component } from '@angular/core';

@Component({
  selector: 'app-cadastro-validado',
  template: `
    <div style="margin: 20px; font-family: sans-serif;">
      <h2>Validação em Template-Driven Forms (Angular 2)</h2>

      <form #f="ngForm" (ngSubmit)="onSubmit(f)" novalidate>
        
        <!-- Campo Nome -->
        <div style="margin-bottom: 15px;">
          <label>Nome Completo: </label><br>
          <input 
            type="text" 
            name="nome" 
            [(ngModel)]="usuario.nome" 
            required 
            minlength="3" 
            #nomeInput="ngModel" 
            style="width: 300px; padding: 5px;" />
          
          <!-- Mensagens de erro condicionais -->
          <div *ngIf="nomeInput.invalid && (nomeInput.dirty || nomeInput.touched)" style="color: red; font-size: 12px; margin-top: 3px;">
            <div *ngIf="nomeInput.errors?.required">O nome é obrigatório.</div>
            <div *ngIf="nomeInput.errors?.minlength">O nome precisa ter pelo menos 3 caracteres.</div>
          </div>
        </div>

        <!-- Campo E-mail -->
        <div style="margin-bottom: 15px;">
          <label>E-mail: </label><br>
          <input 
            type="email" 
            name="email" 
            [(ngModel)]="usuario.email" 
            required 
            email 
            #emailInput="ngModel" 
            style="width: 300px; padding: 5px;" />
          
          <div *ngIf="emailInput.invalid && (emailInput.dirty || emailInput.touched)" style="color: red; font-size: 12px; margin-top: 3px;">
            <div *ngIf="emailInput.errors?.required">O e-mail é obrigatório.</div>
            <div *ngIf="emailInput.errors?.email">Informe um endereço de e-mail válido.</div>
          </div>
        </div>

        <!-- Botão de Submissão desabilitado se o formulário for inválido -->
        <button type="submit" [disabled]="!f.valid" style="padding: 8px 15px;">
          Cadastrar
        </button>
      </form>

      <hr>
      <p><strong>Status Global do Formulário:</strong> {{ f.valid ? 'Válido ✅' : 'Inválido ❌' }}</p>
    </div>
  `
})
export class CadastroValidadoComponent {
  usuario = {
    nome: '',
    email: ''
  };

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Dados enviados:', form.value);
      alert('Formulário enviado com sucesso!');
      form.reset(); // Limpa o formulário e reseta os estados
    }
  }
}
```

2. O Módulo Principal (`app.module.ts`)

Como em qualquer formulário template-driven, certifique-se de importar o `FormsModule` no seu módulo:

```TypeScript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // OBRIGATÓRIO

import { AppComponent } from './app.component';
import { CadastroValidadoComponent } from './cadastro-validado.component';

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule 
  ],
  declarations: [ 
    AppComponent, 
    CadastroValidadoComponent 
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

No Angular versão 2, não possui diretiva para validação nativa para o e-mail, sendo solucionado paliativamente através do `pattern`, cobrindo 99,99% dos casos.

```html
  pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*$"
```