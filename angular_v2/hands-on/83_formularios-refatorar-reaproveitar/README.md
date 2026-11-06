# Angular V2

## Aula 83 - Forms (template driven) Refatorando (simplificando) CSS e Mensagens de Erro

No ecossistema do Angular Versão 2, à medida que o formulário cresce, um problema comum surge: a repetição massiva de código HTML para exibir mensagens de erro e aplicar classes de estilo (`has-error`) em cada input.

Repetir blocos como `*ngIf="input.invalid && (input.dirty || input.touched)"` para cada campo polui o template. Vamos ver como refatorar e simplificar esse código utilizando o poder do próprio motor de estilos do Angular e boas práticas de estruturação.

### Estratégia 1: Automatizar os Estilos via CSS (Eliminando `[class.has-error]`)

Em vez de vincular manualmente classes do Bootstrap (`[class.has-error]`) em cada `div.form-group`, podemos deixar que o Angular aplique as classes de estado nativamente (`ng-invalid`, `ng-touched`) e estilizá-las diretamente no CSS do componente.

### Exemplo de CSS Global/Componente Simplificado:

```CSS
/* Quando o input for inválido E tocado, pinta a borda de vermelho */
input.ng-invalid.ng-touched, 
select.ng-invalid.ng-touched {
  border-color: #a94442;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
}

/* Quando o input for válido E tocado, pinta a borda de verde */
input.ng-valid.ng-touched, 
select.ng-valid.ng-touched {
  border-color: #3c763d;
}
```

Com isso, você remove todos os bindings complexos do HTML e mantém apenas os inputs limpos.

### Estratégia 2: Centralizando a Lógica de Erro no TypeScript

Para evitar repetir múltiplos `*ngIf` para cada tipo de erro (`required`, `minlength`, `email`), podemos criar um método auxiliar na classe do componente que avalia o estado do controle de forma centralizada.

1. O Componente Refatorado (cadastro-limpo.component.ts)

```TypeScript
import { Component } from '@angular/core';

@Component({
  selector: 'app-cadastro-limpo',
  template: `
    <div class="container" style="margin-top: 30px;">
      <h2>Formulário Refatorado e Limpo (Angular 2)</h2>

      <form #f="ngForm" (ngSubmit)="onSubmit(f)">
        
        <!-- Campo Nome (Sem repetição excessiva de HTML) -->
        <div class="form-group">
          <label>Nome Completo:</label>
          <input 
            type="text" 
            class="form-control" 
            name="nome" 
            [(ngModel)]="usuario.nome" 
            required 
            minlength="3" 
            #nome="ngModel" />
          
          <!-- Exibição limpa baseada em método auxiliar -->
          <span class="help-block" *ngIf="deveMostrarErro(nome)">
            {{ obterMensagemErro('nome', nome) }}
          </span>
        </div>

        <!-- Campo E-mail -->
        <div class="form-group">
          <label>E-mail:</label>
          <input 
            type="email" 
            class="form-control" 
            name="email" 
            [(ngModel)]="usuario.email" 
            required 
            email 
            #email="ngModel" />
          
          <span class="help-block" *ngIf="deveMostrarErro(email)">
            {{ obterMensagemErro('email', email) }}
          </span>
        </div>

        <button type="submit" class="btn btn-primary" [disabled]="!f.valid">
          Salvar
        </button>
      </form>
    </div>
  `,
  styles: [`
    input.ng-invalid.ng-touched { border-color: #a94442; }
    input.ng-valid.ng-touched { border-color: #3c763d; }
    .help-block { color: #a94442; font-size: 12px; margin-top: 5px; display: block; }
  `]
})
export class CadastroLimpoComponent {
  usuario = { nome: '', email: '' };

  // Verifica se o campo deve exibir o erro
  deveMostrarErro(campo: any): boolean {
    return campo.invalid && (campo.dirty || campo.touched);
  }

  // Centraliza as mensagens de erro por campo e tipo de validação
  obterMensagemErro(nomeCampo: string, campo: any): string {
    if (campo.errors?.required) {
      return `O campo ${nomeCampo} é obrigatório.`;
    }
    if (campo.errors?.minlength) {
      const min = campo.errors.minlength.requiredLength;
      return `O tamanho mínimo é de ${min} caracteres.`;
    }
    if (campo.errors?.email) {
      return 'Informe um endereço de e-mail válido.';
    }
    return 'Campo inválido.';
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Enviado:', form.value);
      form.reset();
    }
  }
}
```

### O que mudou e por que isso melhora o código?

- **DRY (Don't Repeat Yourself)**: A lógica de validação (`dirty || touched`) foi isolada na função `deveMostrarErro()`.
- **Mensagens Dinâmicas**: A função `obterMensagemErro()` gera textos contextuais reutilizando as propriedades do objeto `errors` do Angular (como `requiredLength`).
- **HTML Enxuto**: O template foca apenas na estrutura visual, deixando a lógica de decisão de mensagens sob responsabilidade da classe TypeScript.

### Hands-on

Para a exemplificação do conteúdo apresentado seguindo a opção 2, criaremos o CampoControlErroComponent.

```bash
# Criar Componente CampoControlErroComponent
ng g c campo-control-erro
```