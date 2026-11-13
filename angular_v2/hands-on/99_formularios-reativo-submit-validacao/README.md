# Angular V2

## Aula 99 - Formulários Reativos: Verificar Validação dos Campos com Botão submit

Uma das situações mais comuns ao trabalhar com Formulários Reativos é o momento em que o usuário clica no botão de submit com o formulário inválido, mas os campos não exibem os erros na tela.

Isso acontece porque, por padrão, as mensagens de erro condicionais dependem da propriedade `touched` (ou seja, o usuário precisa ter focado e saído do campo). Se o usuário apenas preencher parcialmente o formulário e clicar direto em enviar, os campos intocados permanecerão sem feedback visual.

Para resolver isso, utilizamos o método `markAsTouched()` no momento da submissão para forçar o Angular a exibir todos os erros de uma só vez.

### Como Forçar a Exibição de Erros no Submit

Quando chamamos `this.formulario.markAsTouched()`, o Angular percorre recursivamente todos os subgrupos (`FormGroup`) e controles individuais (`FormControl`), alterando o estado de toque para `true`. Como consequência imediata, todas as mensagens de erro condicionais baseadas em `touched` passam a aparecer na interface.

### Exemplo Prático Completo

O Componente (`validacao-submit.component.ts`)

```TypeScript
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-validacao-submit',
  template: `
    <div style="margin: 20px; font-family: sans-serif;">
      <h2>Verificando Validação no Botão Submit (Reactive Forms)</h2>

      <!-- Note que o botão NÃO está desabilitado com [disabled]="!formulario.valid", 
           permitindo que o usuário clique e receba o feedback visual completo -->
      <form [formGroup]="formulario" (ngSubmit)="onSubmit()">
        
        <!-- Campo Nome -->
        <div style="margin-bottom: 15px;">
          <label>Nome Completo:</label><br>
          <input 
            type="text" 
            formControlName="nome" 
            style="width: 300px; padding: 6px;" />
          
          <!-- O erro aparece se o campo for inválido E (tocado OU se tentou enviar) -->
          <div *ngIf="nome.invalid && (nome.touched || formulario.submitted)" style="color: red; font-size: 12px; margin-top: 4px;">
            <div *ngIf="nome.errors?.required">O nome é obrigatório.</div>
            <div *ngIf="nome.errors?.minlength">O nome deve ter no mínimo 3 caracteres.</div>
          </div>
        </div>

        <!-- Campo E-mail -->
        <div style="margin-bottom: 15px;">
          <label>E-mail:</label><br>
          <input 
            type="email" 
            formControlName="email" 
            style="width: 300px; padding: 6px;" />
          
          <div *ngIf="email.invalid && (email.touched || formulario.submitted)" style="color: red; font-size: 12px; margin-top: 4px;">
            <div *ngIf="email.errors?.required">O e-mail é obrigatório.</div>
            <div *ngIf="email.errors?.email">Informe um e-mail válido.</div>
          </div>
        </div>

        <button type="submit" style="padding: 8px 15px;">
          Tentar Enviar
        </button>
      </form>
    </div>
  `
})
export class ValidacaoSubmitComponent implements OnInit {
  
  formulario: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formulario = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get nome() {
    return this.formulario.get('nome');
  }

  get email() {
    return this.formulario.get('email');
  }

  onSubmit() {
    if (this.formulario.valid) {
      console.log('Dados válidos enviados:', this.formulario.value);
      alert('Formulário enviado com sucesso!');
      this.formulario.reset();
    } else {
      console.log('Formulário inválido. Marcando todos os campos como tocados.');
      
      // FORÇA O ANGULAR A MARCAR TODOS OS CONTROLES COMO TOCADOS
      this.formulario.markAsTouched();
      
      alert('Existem campos inválidos ou não preenchidos no formulário.');
    }
  }
}
```

### Boas Práticas de UX (Experiência do Usuário)

- **Desabilitar vs Feedback Imediato**: Manter o botão desabilitado (`[disabled]="!formulario.valid"`) impede que o usuário clique em formulários grandes. Porém, quando o formulário é longo e o usuário não percebe o erro, permitir o clique e usar o `markAsTouched()` em conjunto com um alerta visual orienta exatamente onde estão os problemas.
- **Recursividade do `markAsTouched()`**: Em instâncias de `FormGroup`, chamar `markAsTouched()` propaga-se automaticamente para todos os `FormControl` e subgrupos internos, simplificando o código sem a necessidade de criar loops manuais.