# Angular V2

## Aula 89 - Formulários Reativos: Configuração (Módulo e Componente)

No ecossistema do Angular Versão 2 (legado), configurar **Formulários Reativos** exige dois passos fundamentais: a importação do módulo correto no nível do `NgModule` (`ReactiveFormsModule`) e a estruturação explícita do modelo de controle no componente TypeScript, fazendo a ligação (binding) com o HTML através de diretivas específicas como `[formGroup]` e `formControlName`.

Para esta aula iremos separar os módulos, para isto criaremos o módulo `DataFormModule`.

```bash
# Criar o módulo DataFormModule
ng g module data-form
```

### 1. Configurando o Módulo (`ReactiveFormsModule`)

Enquanto os formulários baseados em template utilizam o `FormsModule`, os formulários reativos dependem exclusivamente do `ReactiveFormsModule`, que deve ser importado em seu módulo principal (ou no módulo específico da funcionalidade).

#### O Arquivo `app.module.ts`:

```TypeScript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // OBRIGATÓRIO para Reactive Forms

import { AppComponent } from './app.component';
import { CadastroReativoComponent } from './cadastro-reativo.component';

@NgModule({
  imports: [ 
    BrowserModule, 
    ReactiveFormsModule // Registrando o módulo reativo
  ],
  declarations: [ 
    AppComponent, 
    CadastroReativoComponent 
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

### 2. Configurando o Componente (TypeScript e Template)

Nos formulários reativos, o modelo do formulário é construído diretamente na classe TypeScript usando classes como `FormGroup` e `FormControl`. O HTML atua apenas como uma interface reflexiva que aponta para esses controles.

Exemplo Prático Completo (`cadastro-reativo.component.ts`)

```TypeScript
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-reativo',
  template: `
    <div style="margin: 20px; font-family: sans-serif;">
      <h2>Configuração de Formulários Reativos (Angular 2)</h2>

      <!-- [formGroup] vincula a tag <form> ao FormGroup criado no TypeScript -->
      <form [formGroup]="formulario" (ngSubmit)="onSubmit()">
        
        <!-- Campo Nome -->
        <div style="margin-bottom: 15px;">
          <label>Nome Completo:</label><br>
          <!-- formControlName conecta o input diretamente ao FormControl 'nome' -->
          <input 
            type="text" 
            formControlName="nome" 
            style="width: 300px; padding: 6px;" />
        </div>

        <!-- Campo E-mail -->
        <div style="margin-bottom: 15px;">
          <label>E-mail:</label><br>
          <input 
            type="email" 
            formControlName="email" 
            style="width: 300px; padding: 6px;" />
        </div>

        <!-- Botão de Envio controlado pelo status de validade do FormGroup -->
        <button type="submit" [disabled]="!formulario.valid" style="padding: 8px 15px;">
          Salvar Dados Reativos
        </button>
      </form>

      <hr>
      <h3>Estado Atual no TypeScript (formulario.value):</h3>
      <pre>{{ formulario.value | json }}</pre>
    </div>
  `
})
export class CadastroReativoComponent implements OnInit {
  
  // Declaração do FormGroup principal
  formulario: FormGroup;

  ngOnInit() {
    // Instanciação e definição da árvore de controles no ciclo de vida ngOnInit
    this.formulario = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      console.log('Dados do formulário reativo:', this.formulario.value);
      alert('Formulário reativo enviado com sucesso!');
      this.formulario.reset(); // Reseta os campos e os estados de validação
    }
  }
}
```

### 3. Diretivas Chave dos Formulários Reativos no Template

- `[formGroup]`: Aplicada na tag `<form>`, recebe a instância do `FormGroup` declarada no TypeScript (`[formGroup]="formulario"`).
- `formControlName`: Aplicada diretamente nos inputs, selects ou textareas, recebe uma string exata correspondente à chave do `FormControl` definida no objeto TypeScript (`formControlName="nome"`).

