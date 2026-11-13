# Angular V2

## Aula 96 - Formulários Reativos: Endereço (Migrando de Template Driven para form reativo)

Migrar a integração de busca automática de CEP (via ViaCEP) de Template-Driven para Formulários Reativos traz uma grande vantagem arquitetural: eliminamos completamente o uso de `[(ngModel)]` e passamos a gerenciar o preenchimento automático dos dados diretamente no TypeScript através do método `patchValue` aplicado ao `FormGroup`.

### O que muda da Abordagem Template-Driven para a Reativa?

- **Adeus ao Two-Way Data Binding**: Nos formulários reativos, os inputs não possuem `[(ngModel)]`. O valor é lido e escrito diretamente por meio da árvore de controle gerenciada no TypeScript.
- **Atualização com `patchValue`**: O método `patchValue()` se encaixa perfeitamente aqui, permitindo injetar os dados retornados pela API (rua, bairro, cidade, uf) diretamente dentro do subgrupo endereco do formulário reativo de forma síncrona e limpa.
- **Escuta de Eventos**: Podemos continuar utilizando o evento (`blur`) no input de CEP para disparar a consulta ao sair do campo, ou evoluir para a escuta reativa via RxJS (`valueChanges`).

### Exemplo Prático Completo: Migrando ViaCEP para Reactive Forms

O Componente (`consulta-cep-reativo.component.ts`)

```TypeScript
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-consulta-cep-reativo',
  template: `
    <div style="margin: 20px; font-family: sans-serif;">
      <h2>Migrando Consulta ViaCEP para Formulários Reativos (Angular 2)</h2>

      <!-- [formGroup] conecta o formulário reativo -->
      <form [formGroup]="formulario" (ngSubmit)="onSubmit()">
        
        <!-- Subgrupo de Endereço conectado via formGroupName -->
        <fieldset formGroupName="endereco" style="border: 1px solid #ccc; padding: 15px; margin-bottom: 15px;">
          <legend><strong>Endereço (Reactive Forms)</strong></legend>
          
          <div style="margin-bottom: 10px;">
            <label>CEP (8 dígitos):</label><br>
            <!-- formControlName mapeia para o controle 'cep' dentro de 'endereco' -->
            <input 
              type="text" 
              formControlName="cep" 
              maxlength="8"
              (blur)="consultarCep()" 
              style="width: 150px; padding: 6px;" />
            <small style="color: #666; display: block;">O endereço será preenchido ao sair do campo.</small>
          </div>

          <div style="margin-bottom: 10px;">
            <label>Logradouro / Rua:</label><br>
            <input type="text" formControlName="rua" style="width: 300px; padding: 6px;" />
          </div>

          <div style="margin-bottom: 10px;">
            <label>Bairro:</label><br>
            <input type="text" formControlName="bairro" style="width: 300px; padding: 6px;" />
          </div>

          <div style="margin-bottom: 10px; display: flex; gap: 10px;">
            <div style="flex: 1;">
              <label>Cidade:</label><br>
              <input type="text" formControlName="cidade" style="width: 200px; padding: 6px;" />
            </div>
            <div style="width: 80px;">
              <label>Estado:</label><br>
              <input type="text" formControlName="estado" style="width: 60px; padding: 6px;" />
            </div>
          </div>
        </fieldset>

        <button type="submit" [disabled]="!formulario.valid" style="padding: 8px 15px;">
          Salvar Endereço Reativo
        </button>
      </form>

      <hr>
      <h3>Estado Atual (formulario.value):</h3>
      <pre style="background: #f4f4f4; padding: 10px; font-size: 12px;">{{ formulario.value | json }}</pre>
    </div>
  `
})
export class ConsultaCepReativoComponent implements OnInit {
  
  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: Http // Injetando o serviço HTTP legado
  ) {}

  ngOnInit() {
    // Construindo a estrutura hierárquica com FormBuilder
    this.formulario = this.fb.group({
      endereco: this.fb.group({
        cep: ['', [Validators.required, Validators.minLength(8)]],
        rua: ['', Validators.required],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        estado: ['', Validators.required]
      })
    });
  }

  consultarCep() {
    // Acessando o valor do CEP diretamente pelo FormGroup
    const cepControl = this.formulario.get('endereco.cep');
    const cep = cepControl ? cepControl.value : '';
    const cepLimpo = cep ? cep.replace(/\D/g, '') : '';

    if (cepLimpo.length === 8) {
      this.http.get(`https://viacep.com.br/ws/${cepLimpo}/json/`)
        .map((response: Response) => response.json())
        .subscribe(
          dados => {
            if (!dados.erro) {
              // USANDO PATCHVALUE: Atualiza o subgrupo de endereço de forma programática e limpa
              this.formulario.patchValue({
                endereco: {
                  rua: dados.logradouro,
                  bairro: dados.bairro,
                  cidade: dados.localidade,
                  estado: dados.uf
                }
              });
            } else {
              alert('CEP não encontrado.');
            }
          },
          erro => {
            console.error('Erro ao consultar CEP:', erro);
          }
        );
    }
  }

  onSubmit() {
    if (this.formulario.valid) {
      console.log('Dados do formulário enviados:', this.formulario.value);
      alert('Endereço cadastrado com sucesso!');
      this.formulario.reset();
    }
  }
}
```

### Por que essa abordagem é superior nos Formulários Reativos?

- **Isolamento de Estado**: Como o `patchValue` atualiza apenas as chaves especificadas no objeto passado, os demais campos (como o número ou complemento que o usuário talvez já tenha digitado) não são corrompidos.
- **Controle Total no TypeScript**: Toda a lógica de requisição HTTP e mapeamento de dados fica isolada na classe, mantendo o template HTML estritamente focado na estrutura visual e no uso do `formControlName`.