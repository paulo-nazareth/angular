# Angular V2

## Aula 92 - Formulários Reativos: Fazendo submit

No ecossistema do Angular Versão 2 (legado), realizar a submissão de um Formulário Reativo é um processo limpo e direto, pois toda a lógica de dados e validação já reside centralizada na classe TypeScript.

Diferente dos formulários Template-Driven (onde frequentemente passávamos a referência do formulário `f` por parâmetro para o método de envio), nos formulários reativos você interage diretamente com a instância do `FormGroup` declarada na classe do componente.

### Como Funciona a Submissão Reativa

1. **Vínculo no HTML**: Você adiciona o evento `(ngSubmit)="onSubmit()"` na tag `<form>`, que já está conectada ao grupo através de `[formGroup]="formulario"`.
2. **Validação na Classe**: Dentro do método `onSubmit()`, você verifica a validade do formulário acessando `this.formulario.valid` (ou `this.formulario.invalid`).
3. **Extração de Dados**: Para enviar os dados, você utiliza diretamente `this.formulario.value`, que retorna um objeto JavaScript limpo contendo todos os valores mapeados pelos controles.
4. **Limpeza e Reset**: Após o sucesso do envio, você pode restaurar o formulário utilizando `this.formulario.reset()`.

### Exemplo Prático Completo

O Componente (submit-reativo.component.ts)

```TypeScript
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-submit-reativo',
  template: `
    <div style="margin: 20px; font-family: sans-serif;">
      <h2>Fazendo Submit em Formulários Reativos (Angular 2)</h2>

      <!-- (ngSubmit) dispara o método onSubmit() ao clicar no botão de submit -->
      <form [formGroup]="formulario" (ngSubmit)="onSubmit()">
        
        <div style="margin-bottom: 15px;">
          <label>Nome:</label><br>
          <input 
            type="text" 
            formControlName="nome" 
            style="width: 300px; padding: 6px;" />
        </div>

        <div style="margin-bottom: 15px;">
          <label>E-mail:</label><br>
          <input 
            type="email" 
            formControlName="email" 
            style="width: 300px; padding: 6px;" />
        </div>

        <!-- O botão envia os dados quando clicado -->
        <button type="submit" [disabled]="!formulario.valid" style="padding: 8px 15px;">
          Submeter Dados
        </button>
      </form>

      <hr>
      <h3>Valores Atuais (formulario.value):</h3>
      <pre style="background: #f4f4f4; padding: 10px; font-size: 12px;">{{ formulario.value | json }}</pre>
    </div>
  `
})
export class SubmitReativoComponent implements OnInit {
  
  formulario: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formulario = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    // Verificação de segurança adicional antes de processar os dados
    if (this.formulario.valid) {
      console.log('Objeto do formulário:', this.formulario.value);
      alert('Formulário reativo submetido com sucesso!');
      
      // Reseta os campos e os estados de validação/toque
      this.formulario.reset();
    } else {
      console.log('O formulário contém erros e não pode ser submetido.');
    }
  }
}
```

### Boas Práticas na Submissão Reativa

- **Encapsulamento**: Como o objeto `formulario` é uma propriedade pública da classe, você não precisa injetar parâmetros no HTML (`(ngSubmit)="onSubmit(f)"` vira apenas `(ngSubmit)="onSubmit()"`).
- **Tratamento de Erros de UX**: Caso queira exibir todas as mensagens de erro caso o usuário tente forçar o envio de um formulário inválido, você pode iterar sobre os controles ou utilizar métodos utilitários para marcar todos como `touched` programaticamente.