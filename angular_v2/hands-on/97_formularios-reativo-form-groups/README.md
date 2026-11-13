# Angular V2

## Aula 97 - Formulários Reativos: Form groups (Agrupando Dados)

Agrupar dados em Formulários Reativos é uma das suas maiores fortalezas. Diferente dos formulários baseados em template (onde utilizávamos a diretiva `ngModelGroup`), nos formulários reativos a criação de subgrupos é feita de forma nativa e estruturada diretamente no TypeScript através do `FormGroup` (ou com o auxílio do `FormBuilder`) e conectada no HTML com a diretiva `formGroupName`.

### Como Funcionam os Grupos em Formulários Reativos?

- **Estrutura Hierárquica no TypeScript**: Um `FormGroup` principal pode conter dentro de si outros `FormGroup` aninhados. Cada subgrupo gerencia seu próprio conjunto de `FormControl`, isolando o estado de validação daquela seção específica.
- **Objeto JSON Aninhado Natural**: Ao submeter o formulário (`formulario.value`), o Angular produz automaticamente um objeto estruturado em árvore (ex: `{ dadosPessoais: { nome: '...' }, endereco: { cep: '...' } }`), refletindo exatamente a arquitetura definida no código.
- **Validade em Cascata**: Se qualquer campo obrigatório dentro de um subgrupo aninhado estiver inválido, o subgrupo inteiro torna-se inválido, o que por sua vez invalida o formulário principal (`formulario.valid`), bloqueando a submissão.

### Exemplo Prático Completo: Criando Subgrupos Aninhados

O Componente (`form-groups-reativo.component.ts`)

```TypeScript
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-groups-reativo',
  template: `
    <div style="margin: 20px; font-family: sans-serif;">
      <h2>Agrupando Dados com FormGroups Aninhados (Reactive Forms)</h2>

      <!-- [formGroup] conecta o formulário principal -->
      <form [formGroup]="formulario" (ngSubmit)="onSubmit()">
        
        <!-- Seção 1: Dados Pessoais (FormGroup direto na raiz) -->
        <fieldset style="border: 1px solid #ccc; padding: 15px; margin-bottom: 15px;">
          <legend><strong>Dados Pessoais</strong></legend>
          
          <div style="margin-bottom: 10px;">
            <label>Nome Completo:</label><br>
            <input 
              type="text" 
              formControlName="nome" 
              style="width: 300px; padding: 6px;" />
            
            <div *ngIf="formulario.get('nome').invalid && formulario.get('nome').touched" style="color: red; font-size: 12px;">
              Nome obrigatório (mínimo de 3 caracteres).
            </div>
          </div>
        </fieldset>

        <!-- Seção 2: Endereço (Subgrupo conectado via formGroupName) -->
        <fieldset formGroupName="endereco" style="border: 1px solid #ccc; padding: 15px; margin-bottom: 15px;">
          <legend><strong>Endereço (Subgrupo Aninhado)</strong></legend>
          
          <div style="margin-bottom: 10px;">
            <label>CEP:</label><br>
            <input 
              type="text" 
              formControlName="cep" 
              style="width: 150px; padding: 6px;" />
          </div>

          <div style="margin-bottom: 10px;">
            <label>Rua:</label><br>
            <input 
              type="text" 
              formControlName="rua" 
              style="width: 300px; padding: 6px;" />
          </div>

          <!-- Verificando a validade isolada do subgrupo de endereço -->
          <p style="font-size: 12px; color: #666;">
            <em>O subgrupo de endereço é válido? {{ formulario.get('endereco').valid ? 'Sim ✅' : 'Não ❌' }}</em>
          </p>
        </fieldset>

        <!-- Botão de Envio -->
        <button type="submit" [disabled]="!formulario.valid" style="padding: 8px 15px;">
          Salvar Dados Completos
        </button>
      </form>

      <hr>
      <h3>Visualizando o Objeto Aninhado (formulario.value):</h3>
      <pre style="background: #f4f4f4; padding: 10px; font-size: 12px;">{{ formulario.value | json }}</pre>
    </div>
  `
})
export class FormGroupsReativoComponent implements OnInit {
  
  formulario: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Construindo grupos aninhados utilizando o FormBuilder
    this.formulario = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      endereco: this.fb.group({
        cep: ['', Validators.required],
        rua: ['', Validators.required]
      })
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      console.log('Objeto estruturado enviado:', this.formulario.value);
      alert('Cadastro realizado com sucesso!');
      this.formulario.reset();
    }
  }
}
```

### Pontos Chave da Abordagem Reativa para Grupos:

- **Diretiva `formGroupName`**: No HTML, usamos `formGroupName="endereco"` para informar ao Angular que os inputs internos pertencem àquele subgrupo específico declarado no TypeScript.
- **Acesso Profundo (`get`)**: Podemos inspecionar controles aninhados facilmente utilizando caminhos com pontos no método `get` (ex: `formulario.get('endereco.cep')`).

