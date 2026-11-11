# Angular V2

## Aula 94 - Formulários Reativos: Aplicando Validação nos Campos

A aplicação de regras de validação em Formulários Reativos é feita inteiramente no arquivo TypeScript, centralizando a lógica de negócio longe do template HTML.

Diferente dos formulários Template-Driven (onde utilizávamos atributos HTML nativos como `required` ou `minlength`), nos formulários reativos utilizamos a classe utilitária `Validators` fornecida pelo módulo `@angular/forms`, passando as regras diretamente na definição do controle.

### 1. Validadores Níncronos Comuns (`Validators`)

Ao instanciar um `FormControl` (seja manualmente ou através do `FormBuilder`), o segundo argumento aceita um array de funções validadoras síncronas. Os mais comuns no Angular 2 incluem:

- `Validators.required`: Garante que o campo não esteja vazio.
- `Validators.minLength(n)`: Define o número mínimo de caracteres permitidos.
- `Validators.maxLength(n)`: Define o limite máximo de caracteres.
- `Validators.email`: Valida se o formato de e-mail está estruturalmente correto.
- `Validators.pattern(regex)`: Aplica uma expressão regular personalizada (útil para CEP, CPF, telefones, etc.).

### 2. Exemplo Prático Completo: Aplicando Validações e Exibindo Erros

O Componente (`validacao-reativa.component.ts`)

```TypeScript
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-validacao-reativa',
  template: `
    <div style="margin: 20px; font-family: sans-serif;">
      <h2>Aplicando Validação em Formulários Reativos (Angular 2)</h2>

      <form [formGroup]="formulario" (ngSubmit)="onSubmit()">
        
        <!-- Campo Nome com Múltiplas Validações -->
        <div style="margin-bottom: 15px;">
          <label>Nome Completo:</label><br>
          <input 
            type="text" 
            formControlName="nome" 
            style="width: 300px; padding: 6px;" />
          
          <!-- Mensagens de Erro Condicionais -->
          <div *ngIf="formulario.get('nome').invalid && formulario.get('nome').touched" style="color: red; font-size: 12px; margin-top: 4px;">
            <div *ngIf="formulario.get('nome').errors?.required">O nome é obrigatório.</div>
            <div *ngIf="formulario.get('nome').errors?.minlength">O nome deve ter no mínimo 3 caracteres.</div>
          </div>
        </div>

        <!-- Campo E-mail com Validação de Formato -->
        <div style="margin-bottom: 15px;">
          <label>E-mail:</label><br>
          <input 
            type="email" 
            formControlName="email" 
            style="width: 300px; padding: 6px;" />
          
          <div *ngIf="formulario.get('email').invalid && formulario.get('email').touched" style="color: red; font-size: 12px; margin-top: 4px;">
            <div *ngIf="formulario.get('email').errors?.required">O e-mail é obrigatório.</div>
            <div *ngIf="formulario.get('email').errors?.email">Informe um endereço de e-mail válido.</div>
          </div>
        </div>

        <!-- O botão permanece desabilitado enquanto o formulário for inválido -->
        <button type="submit" [disabled]="!formulario.valid" style="padding: 8px 15px;">
          Salvar Dados Validados
        </button>
      </form>

      <hr>
      <h3>Status de Validade Global:</h3>
      <p><strong>Formulário Válido?</strong> {{ formulario.valid ? 'Sim ✅' : 'Não ❌' }}</p>
    </div>
  `,
  styles: [`
    /* Estilização automática baseada nas classes nativas do Angular 2 */
    input.ng-invalid.ng-touched {
      border: 1px solid #a94442;
    }
    input.ng-valid.ng-touched {
      border: 1px solid #3c763d;
    }
  `]
})
export class ValidacaoReativaComponent implements OnInit {
  
  formulario: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Definindo os validadores diretamente no FormBuilder
    this.formulario = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      console.log('Dados validados com sucesso:', this.formulario.value);
      alert('Formulário enviado com sucesso!');
      this.formulario.reset();
    }
  }
}
```

### Vantagens da Validação Reativa

- **Testabilidade**: Como as regras de validação estão no TypeScript, você pode testar a integridade e os comportamentos de erro do formulário usando testes unitários puros, sem precisar renderizar o DOM.
- **Acesso Direto via `get()`**: O método `formulario.get('nome')` permite inspecionar o estado, os erros (`errors`) e a validade de qualquer campo de forma limpa e programática tanto no template quanto na classe.