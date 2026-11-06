# Angular V2

## Aula 82 - Forms (template driven) Adicionando Campos de Endereço (form layout Bootstrap 3)

No ecossistema do Angular Versão 2, à medida que os formulários crescem e passam a abranger seções complexas como dados de endereço, a organização visual e estrutural torna-se fundamental. Para isso, combinamos o poder do **Bootstrap 3** (framework CSS padrão da época para grids e componentes de formulário) com a diretiva `ngModelGroup` do Angular, permitindo agrupar os campos de endereço em um objeto aninhado dentro do modelo de dados.

### 1. Organizando o Layout com Bootstrap 3

O Bootstrap 3 utiliza um sistema de grid baseado em classes bem específicas para formulários:

- `.form-group`: Classe obrigatória que envolve cada par de `<label>` e `<input>`, garantindo o espaçamento vertical correto.
- `.form-control`: Aplicada diretamente em inputs, selects e textareas para estilizar a largura em 100% e adicionar bordas e sombras padronizadas.
- Grid (`.row`, `.col-md-*`): Utilizada para alinhar campos lado a lado (por exemplo, "Número" e "CEP" na mesma linha).

### 2. Agrupando Dados com `ngModelGroup`

Para evitar que o objeto principal do formulário fique inflado com dezenas de propriedades planas (como `rua`, `numero`, `cidade`), usamos a diretiva `ngModelGroup="endereco"`.

- Ela cria um subgrupo lógico no `ngForm`.
- No objeto final enviado (`f.value`), o endereço aparecerá como um objeto aninhado:` { nome: '...', endereco: { cep: '...', rua: '...' } }`.
- Permite validar o grupo de endereço separadamente se necessário.

### 3. Exemplo Prático Completo

O Componente (`cadastro-endereco.component.ts`)

```TypeScript
import { Component } from '@angular/core';

@Component({
  selector: 'app-cadastro-endereco',
  template: `
    <div class="container" style="margin-top: 30px;">
      <h2>Cadastro com Endereço (Template-Driven + Bootstrap 3)</h2>

      <form #f="ngForm" (ngSubmit)="onSubmit(f)">
        
        <!-- Dados Pessoais -->
        <div class="panel panel-default">
          <div class="panel-heading"><strong>1. Dados Pessoais</strong></div>
          <div class="panel-body">
            
            <div class="form-group" [class.has-error]="nomeInput.invalid && nomeInput.touched">
              <label class="control-label">Nome Completo:</label>
              <input 
                type="text" 
                class="form-control" 
                name="nome" 
                [(ngModel)]="usuario.nome" 
                required 
                minlength="3" 
                #nomeInput="ngModel" />
              <span class="help-block" *ngIf="nomeInput.invalid && nomeInput.touched">
                O nome é obrigatório (mínimo de 3 caracteres).
              </span>
            </div>

            <div class="form-group" [class.has-error]="emailInput.invalid && emailInput.touched">
              <label class="control-label">E-mail:</label>
              <input 
                type="email" 
                class="form-control" 
                name="email" 
                [(ngModel)]="usuario.email" 
                required 
                email 
                #emailInput="ngModel" />
              <span class="help-block" *ngIf="emailInput.invalid && emailInput.touched">
                Informe um e-mail válido.
              </span>
            </div>

          </div>
        </div>

        <!-- Seção de Endereço agrupada com ngModelGroup -->
        <div class="panel panel-default" ngModelGroup="endereco" #enderecoGroup="ngModelGroup">
          <div class="panel-heading"><strong>2. Endereço de Entrega</strong></div>
          <div class="panel-body">
            
            <div class="row">
              <div class="col-md-4 form-group">
                <label>CEP:</label>
                <input 
                  type="text" 
                  class="form-control" 
                  name="cep" 
                  [(ngModel)]="usuario.endereco.cep" 
                  required 
                  #cepInput="ngModel" />
              </div>
              
              <div class="col-md-8 form-group">
                <label>Rua / Logradouro:</label>
                <input 
                  type="text" 
                  class="form-control" 
                  name="rua" 
                  [(ngModel)]="usuario.endereco.rua" 
                  required 
                  #ruaInput="ngModel" />
              </div>
            </div>

            <div class="row">
              <div class="col-md-4 form-group">
                <label>Número:</label>
                <input 
                  type="text" 
                  class="form-control" 
                  name="numero" 
                  [(ngModel)]="usuario.endereco.numero" 
                  required />
              </div>

              <div class="col-md-8 form-group">
                <label>Cidade:</label>
                <input 
                  type="text" 
                  class="form-control" 
                  name="cidade" 
                  [(ngModel)]="usuario.endereco.cidade" 
                  required />
              </div>
            </div>

          </div>
        </div>

        <!-- Botão de Envio -->
        <button type="submit" class="btn btn-primary btn-lg" [disabled]="!f.valid">
          Salvar Cadastro Completo
        </button>
      </form>

      <hr>
      <h4>Estrutura de Dados Gerada (f.value):</h4>
      <pre>{{ f.value | json }}</pre>
    </div>
  `
})
export class CadastroEnderecoComponent {
  usuario = {
    nome: '',
    email: '',
    endereco: {
      cep: '',
      rua: '',
      numero: '',
      cidade: ''
    }
  };

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Dados completos enviados:', form.value);
      alert('Cadastro realizado com sucesso!');
      form.reset();
    }
  }
}
```

### Destaques do Bootstrap 3 aplicados ao Angular:

- `[class.has-error]`: Vinculamos dinamicamente a classe de erro do Bootstrap 3 (`has-error`) quando o campo é inválido e tocado, fazendo com que os labels e caixas de texto fiquem vermelhos automaticamente.
- `.help-block`: Classe padrão do Bootstrap para exibir textos de ajuda ou mensagens de erro logo abaixo do input.

