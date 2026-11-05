# Angular V2

## Aula 80 - Forms (template driven) Desabilitando o Botão de Submit para Formulário Inválido

No ecossistema do Angular Versão 2, uma das práticas mais comuns e importantes em formulários **Template-Driven** é controlar o estado do botão de envio (`submit`) com base na validade geral do formulário.

Como o Angular monitora em tempo real o estado de todos os campos através da diretiva `ngForm`, você pode vincular a propriedade `valid` ou `invalid` diretamente ao atributo `[disabled]` do botão, impedindo que o usuário envie dados incompletos ou incorretos.

### Como Funciona a Desativação

1. **Exportar o `ngForm`**: Você cria uma variável de referência no elemento `<form>` apontando para o ngForm (`#f="ngForm"`).
2. **Property Binding no Botão**: Você utiliza `[disabled]="!f.valid"` (ou `[disabled]="f.invalid"`). Enquanto houver qualquer erro de validação em campos obrigatórios, a propriedade `valid` será `false`, mantendo o botão desativado (`disabled = true`).

### Exemplo Prático Completo

O Componente (`form-submit-disabled.component.ts`)

```TypeScript
import { Component } from '@angular/core';

@Component({
  selector: 'app-form-disabled',
  template: `
    <div style="margin: 20px; font-family: sans-serif;">
      <h2>Desabilitando Botão de Submit (Template-Driven)</h2>

      <!-- #f="ngForm" exporta a instância do formulário -->
      <form #f="ngForm" (ngSubmit)="onSubmit(f)">
        
        <div style="margin-bottom: 15px;">
          <label>Nome Completo: </label><br>
          <input 
            type="text" 
            name="nome" 
            [(ngModel)]="usuario.nome" 
            required 
            minlength="3" 
            #nomeInput="ngModel" />
          
          <div *ngIf="nomeInput.invalid && (nomeInput.dirty || nomeInput.touched)" style="color: red; font-size: 12px;">
            <small *ngIf="nomeInput.errors?.required">O nome é obrigatório.</small>
            <small *ngIf="nomeInput.errors?.minlength">Mínimo de 3 caracteres.</small>
          </div>
        </div>

        <div style="margin-bottom: 15px;">
          <label>E-mail: </label><br>
          <input 
            type="email" 
            name="email" 
            [(ngModel)]="usuario.email" 
            required 
            email 
            #emailInput="ngModel" />
          
          <div *ngIf="emailInput.invalid && (emailInput.dirty || emailInput.touched)" style="color: red; font-size: 12px;">
            <small *ngIf="emailInput.errors?.required">O e-mail é obrigatório.</small>
            <small *ngIf="emailInput.errors?.email">E-mail inválido.</small>
          </div>
        </div>

        <!-- O botão é desabilitado dinamicamente enquanto f.valid for false -->
        <button 
          type="submit" 
          [disabled]="!f.valid" 
          [class.btn-disabled]="!f.valid"
          style="padding: 10px 20px; cursor: pointer;">
          Salvar Cadastro
        </button>
      </form>

      <hr>
      <p><strong>Formulário Válido?</strong> {{ f.valid ? 'Sim ✅' : 'Não ❌ (Botão Desativado)' }}</p>
    </div>
  `,
  styles: [`
    input.ng-invalid.ng-touched {
      border: 1px solid red;
    }
    /* Estilo visual opcional para o botão quando desativado */
    button:disabled {
      background-color: #e0e0e0;
      color: #a8a8a8;
      cursor: not-allowed !important;
      border: 1px solid #ccc;
    }
  `]
})
export class FormSubmitDisabledComponent {
  usuario = {
    nome: '',
    email: ''
  };

  onSubmit(form: any) {
    // Segurança extra no backend/método caso o atributo disabled seja inspecionado via DevTools
    if (form.valid) {
      console.log('Dados enviados:', form.value);
      alert('Cadastro realizado com sucesso!');
      form.reset(); // Limpa e reseta o formulário e o botão volta a ficar desabilitado
    }
  }
}
```

### Dica Importante de UX (Experiência do Usuário)

Desabilitar o botão de submit previne envios acidentais, mas em termos de UX pura, alguns desenvolvedores preferem manter o botão sempre habilitado e, ao ser clicado, destacar os erros e exibir um alerta geral caso o formulário esteja inválido. No entanto, o uso de `[disabled]="!f.valid"` é o padrão mais direto e seguro para garantir que requisições inválidas não cheguem ao componente ou à API.