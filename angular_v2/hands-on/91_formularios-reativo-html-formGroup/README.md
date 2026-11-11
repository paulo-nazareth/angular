# Angular V2

## Aula 91 - Formulários Reativos: Sincronizando HTML com FormGroup

No ecossistema do Angular Versão 2 (legado), após estruturar o modelo lógico do formulário no TypeScript utilizando um `FormGroup` (seja manualmente ou através do `FormBuilder`), o passo seguinte é conectar esse modelo ao arquivo HTML.

Essa conexão é feita através de **diretivas reativas** específicas que dizem ao Angular exatamente qual elemento visual corresponde a qual controle no TypeScript.

### As Diretivas de Sincronização no Template

Para fazer a ponte entre o template e o componente TypeScript, utilizamos três diretivas principais do `ReactiveFormsModule`:

1. `[formGroup]`: Aplicada na tag `<form>`, ela recebe a instância do `FormGroup` criada no TypeScript, estabelecendo o contexto global do formulário para aquele bloco HTML.
2. `formControlName`: Aplicada diretamente nos elementos de entrada (`input`, `select`, `textarea`), ela recebe uma string correspondente à chave exata do campo definida no `FormGroup` do TypeScript, vinculando a digitação do usuário ao controle correspondente.
3. **`formGroupName` (Opcional)**: Utilizada quando você possui subgrupos (objetos aninhados dentro do **FormGroup**), servindo para conectar uma seção inteira (como dados de endereço) ao seu respectivo subgrupo.

### Exemplo Prático Completo: Sincronizando HTML com TypeScript

1. O Componente (`sincronizacao.component.ts`)

```TypeScript
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sincronizacao',
  template: `
    <div style="margin: 20px; font-family: sans-serif;">
      <h2>Sincronizando HTML com FormGroup (Reactive Forms)</h2>

      <!-- [formGroup] conecta a tag <form> à variável 'formulario' do TypeScript -->
      <form [formGroup]="formulario" (ngSubmit)="onSubmit()">
        
        <!-- Campo Nome -->
        <div style="margin-bottom: 15px;">
          <label>Nome Completo:</label><br>
          <!-- formControlName="nome" sincroniza com a chave 'nome' do FormGroup -->
          <input 
            type="text" 
            formControlName="nome" 
            style="width: 300px; padding: 6px;" />
        </div>

        <!-- Campo E-mail -->
        <div style="margin-bottom: 15px;">
          <label>E-mail:</label><br>
          <!-- formControlName="email" sincroniza com a chave 'email' do FormGroup -->
          <input 
            type="email" 
            formControlName="email" 
            style="width: 300px; padding: 6px;" />
        </div>

        <!-- Subgrupo de Endereço (utilizando formGroupName) -->
        <fieldset formGroupName="endereco" style="border: 1px solid #ccc; padding: 15px; margin-bottom: 15px;">
          <legend><strong>Endereço</strong></legend>
          
          <div style="margin-bottom: 10px;">
            <label>CEP:</label><br>
            <input type="text" formControlName="cep" style="width: 150px; padding: 4px;" />
          </div>

          <div style="margin-bottom: 10px;">
            <label>Rua:</label><br>
            <input type="text" formControlName="rua" style="width: 300px; padding: 4px;" />
          </div>
        </fieldset>

        <!-- O botão é desabilitado caso o formulário seja inválido -->
        <button type="submit" [disabled]="!formulario.valid" style="padding: 8px 15px;">
          Salvar Dados Sincronizados
        </button>
      </form>

      <hr>
      <h3>Visualizando Estado Atual (formulario.value):</h3>
      <pre style="background: #f4f4f4; padding: 10px; font-size: 12px;">{{ formulario.value | json }}</pre>
    </div>
  `
})
export class SincronizacaoComponent implements OnInit {
  
  formulario: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Definindo a estrutura hierárquica no TypeScript
    this.formulario = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      endereco: this.fb.group({
        cep: ['', Validators.required],
        rua: ['', Validators.required]
      })
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      console.log('Dados submetidos via Reactive Form:', this.formulario.value);
      alert('Formulário enviado com sucesso!');
      this.formulario.reset();
    }
  }
}
```

### Diferenças Críticas em Relação ao Template-Driven:

- **Ausência de `[(ngModel)]`**: Nos formulários reativos, você não utiliza a sintaxe de Two-Way Data Binding (`[(ngModel)]`). O fluxo de dados é gerenciado por baixo dos panos pelo vínculo estabelecido entre o `formControlName` e o `FormGroup`.
- **Sem atributo `name` obrigatório**: Enquanto no Template-Driven o atributo `name` do HTML era fundamental para registrar o controle, nos formulários reativos a chave de identificação absoluta é o valor passado em `formControlName`.

### Reaproveitando Código Debug

Para utilização do componente `FormDebugComponent`, será necessário criar um módulo compartilhado `SharedModule`

```bash
# Criação Módulo Compartilhado SharedModule
ng g m shared
```

Para a devida associação do `FormDebugComponent` possa apresentar os valores vale lembrar que será necessário substituir o atributo `name` do HTML, pelo `formControlName`.


