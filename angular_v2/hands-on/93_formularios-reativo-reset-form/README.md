# Angular V2

## Aula 93 - Formulários Reativos: Resetando o form

Resetar um Formulário Reativo vai muito além de apenas limpar os valores digitados nos inputs. Como os formulários reativos mantêm um controle rigoroso de estado no TypeScript (`dirty`, `touched`, `valid`, `errors`), o método `reset()` do `FormGroup` redefine o formulário por completo.

### O que o método `reset()` faz em Formulários Reativos?

Quando você executa `this.formulario.reset()`, o Angular realiza as seguintes ações simultaneamente:

1. **Limpa os Valores**: Retorna todos os campos para o valor vazio (`''`) ou para os valores iniciais que você definir opcionalmente.
2. **Reseta os Estados de Interação**: Remove as classes de toque e modificação, retornando os controles aos estados `pristine` (não modificado) e `untouched` (não tocado). Isso faz com que as mensagens de erro desapareçam imediatamente da tela.
3. **Reseta a Validade**: Recalcula as regras e limpa o rastreamento de erros pendentes.

### Passando Valores Iniciais Opcionais no `reset()`

Você sabia que o método `reset()` aceita um objeto opcional? Se você passar um objeto com a mesma estrutura do seu formulário, o Angular limpará os estados de erro/toque, mas repovoará os campos com os valores padrão informados:

```TypeScript
// Reseta limpando tudo
this.formulario.reset();

// Reseta restaurando valores padrão específicos
this.formulario.reset({
  nome: 'Usuário Padrão',
  email: 'exemplo@dominio.com'
});
```

### Exemplo Prático Completo

O Componente (`reset-reativo.component.ts`)

```TypeScript
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-reativo',
  template: `
    <div style="margin: 20px; font-family: sans-serif;">
      <h2>Resetando Formulários Reativos (Angular 2)</h2>

      <form [formGroup]="formulario" (ngSubmit)="onSubmit()">
        
        <div style="margin-bottom: 15px;">
          <label>Nome:</label><br>
          <input 
            type="text" 
            formControlName="nome" 
            style="width: 300px; padding: 6px;" />
          
          <!-- Erro exibido apenas se tocado e inválido -->
          <div *ngIf="formulario.get('nome').invalid && formulario.get('nome').touched" style="color: red; font-size: 12px;">
            O nome é obrigatório (mínimo de 3 caracteres).
          </div>
        </div>

        <div style="margin-bottom: 15px;">
          <label>E-mail:</label><br>
          <input 
            type="email" 
            formControlName="email" 
            style="width: 300px; padding: 6px;" />
        </div>

        <!-- Botões de Ação -->
        <div style="display: flex; gap: 10px;">
          <button type="submit" [disabled]="!formulario.valid" style="padding: 8px 15px;">
            Salvar Dados
          </button>
          
          <!-- Botão para resetar o formulário manualmente -->
          <button type="button" (click)="onReset()" style="padding: 8px 15px; background-color: #f0f0f0; cursor: pointer;">
            Limpar Formulário
          </button>
        </div>
      </form>

      <hr>
      <h3>Estado de Controle (Debug):</h3>
      <p><strong>Pristine (Intacto):</strong> {{ formulario.pristine }}</p>
      <p><strong>Dirty (Modificado):</strong> {{ formulario.dirty }}</p>
      <pre style="background: #f4f4f4; padding: 10px; font-size: 12px;">{{ formulario.value | json }}</pre>
    </div>
  `
})
export class ResetReativoComponent implements OnInit {
  
  formulario: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formulario = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      console.log('Dados salvos:', this.formulario.value);
      alert('Formulário enviado e resetado com sucesso!');
      
      // Reseta o formulário após o sucesso do envio
      this.formulario.reset();
    }
  }

  onReset() {
    // Limpa os campos e redefine os estados de toque e validação manualmente
    this.formulario.reset();
  }
}
```