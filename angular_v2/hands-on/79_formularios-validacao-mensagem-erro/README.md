# Angular V2

## Aula 79 - Forms (template driven) Mostrando Mensagens de Erro de Validação

No ecossistema do Angular Versão 2, exibir mensagens de erro de forma elegante e contextual em formulários Template-Driven envolve combinar a referência de template do controle (`#nomeInput="ngModel"`) com a propriedade `.errors` gerada automaticamente pelo Angular.

Quando um campo falha em uma ou mais validações, o Angular preenche o objeto errors com chaves correspondentes às regras violadas (ex: `required`, `minlength`, `pattern`, `email`), permitindo que você exiba mensagens específicas para cada tipo de erro.

### Estratégia para Exibir Mensagens de Erro

Para evitar que os erros apareçam antes do usuário começar a preencher o formulário, a boa prática recomenda verificar três condições simultaneamente:

1. **O campo é inválido?** (`inputRef.invalid`)
2. **O usuário já interagiu/modificou o campo?** (`inputRef.dirty` ou `inputRef.touched`)
3. **Qual foi a regra específica violada?** (`inputRef.errors?.required`, `inputRef.errors?.minlength`, etc.)

### Exemplo Prático Completo

O Componente (`mensagens-erro.component.ts`)

```TypeScript
import { Component } from '@angular/core';

@Component({
  selector: 'app-mensagens-erro',
  template: `
    <div style="margin: 20px; font-family: sans-serif;">
      <h2>Exibindo Mensagens de Erro (Template-Driven)</h2>

      <form #f="ngForm" (ngSubmit)="onSubmit(f)">
        
        <!-- Campo Nome com Múltiplas Validações -->
        <div style="margin-bottom: 20px;">
          <label>Nome Completo: </label><br>
          <input 
            type="text" 
            name="nome" 
            [(ngModel)]="usuario.nome" 
            required 
            minlength="4" 
            maxlength="20"
            #nomeInput="ngModel" />

          <!-- Bloco container de erros (só aparece se inválido E tocado/modificado) -->
          <div *ngIf="nomeInput.invalid && (nomeInput.dirty || nomeInput.touched)" style="color: #a94442; font-size: 13px; margin-top: 5px;">
            
            <!-- Mensagem para erro de preenchimento obrigatório -->
            <div *ngIf="nomeInput.errors?.required">
              ⚠️ O campo nome é obrigatório.
            </div>

            <!-- Mensagem para tamanho mínimo -->
            <div *ngIf="nomeInput.errors?.minlength">
              ⚠️ O nome precisa ter pelo menos 4 caracteres (atual: {{ nomeInput.errors.minlength.actual }}/{{ nomeInput.errors.minlength.requiredLength }}).
            </div>

            <!-- Mensagem para tamanho máximo -->
            <div *ngIf="nomeInput.errors?.maxlength">
              ⚠️ O nome não pode exceder 20 caracteres.
            </div>

          </div>
        </div>

        <!-- Botão de Submissão -->
        <button type="submit" [disabled]="!f.valid">
          Enviar Cadastro
        </button>
      </form>
    </div>
  `
})
export class MensagensErroComponent {
  usuario = {
    nome: ''
  };

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Dados enviados com sucesso:', form.value);
      alert('Formulário enviado!');
      form.reset();
    }
  }
}
```

### O que é o `inputRef.errors`?

O objeto `errors` retornado pelo Angular para cada diretiva de validação contém informações detalhadas que você pode exibir dinamicamente:

- `required`: Retorna `true` se o campo estiver vazio.
- `minlength`: Retorna um objeto contendo `{ requiredLength: 4, actualLength: 2 }`, permitindo que você mostre exatamente quantos caracteres faltam para o usuário.
- `maxlength`: Retorna `{ requiredLength: 20, actualLength: 22 }` informando o excesso.