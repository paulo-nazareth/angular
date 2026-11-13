# Angular V2

## Aula 98 - Formulários Reativos: Autopopulando Endereço com CEP (setValue e patchValue)

Utilizar Formulários Reativos combinado com a API do ViaCEP torna a tarefa de autopopular dados muito mais elegante e controlada do que no modelo Template-Driven.

Como o formulário é gerenciado diretamente no TypeScript através de instâncias de `FormGroup` e `FormControl`, podemos atualizar os valores programaticamente usando os métodos `patchValue` ou `setValue`.

### `patchValue` vs `setValue` em Formulários Reativos

| Método | Comportamento | Recomendação para CEP |
| :--- | :--- | :--- |
| `patchValue()` | Atualiza apenas as propriedades informadas no objeto, ignorando o restante. | Ideal. Permite atualizar apenas logradouro, bairro, cidade e estado, mantendo o valor do CEP intacto. |
| `setValue()` | Exige a estrutura completa e exata de todos os controles do grupo. Se faltar qualquer campo, o Angular dispara um erro no console. | Rígido. Útil apenas se você estiver carregando um registro inteiro de dados do backend de uma só vez. |

### Exemplo Prático Completo: Autopopulando com `patchValue`

O Componente (`cep-reativo-valores.component.ts`)

```TypeScript
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-cep-reativo-valores',
  template: `
    <div style="margin: 20px; font-family: sans-serif;">
      <h2>Autopopulando Endereço com patchValue (Reactive Forms)</h2>

      <form [formGroup]="formulario" (ngSubmit)="onSubmit()">
        
        <fieldset formGroupName="endereco" style="border: 1px solid #ccc; padding: 15px; margin-bottom: 15px;">
          <legend><strong>Endereço</strong></legend>
          
          <div style="margin-bottom: 10px;">
            <label>CEP (8 dígitos):</label><br>
            <input 
              type="text" 
              formControlName="cep" 
              maxlength="8"
              (blur)="consultarCep()" 
              style="width: 150px; padding: 6px;" />
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
          Salvar Endereço
        </button>
      </form>

      <hr>
      <h3>Estado Atual (formulario.value):</h3>
      <pre style="background: #f4f4f4; padding: 10px; font-size: 12px;">{{ formulario.value | json }}</pre>
    </div>
  `
})
export class CepReativoValoresComponent implements OnInit {
  
  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: Http
  ) {}

  ngOnInit() {
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
    const cepControl = this.formulario.get('endereco.cep');
    const cep = cepControl ? cepControl.value : '';
    const cepLimpo = cep ? cep.replace(/\D/g, '') : '';

    if (cepLimpo.length === 8) {
      this.http.get(`https://viacep.com.br/ws/${cepLimpo}/json/`)
        .map((response: Response) => response.json())
        .subscribe(
          dados => {
            if (!dados.erro) {
              // 1. USANDO PATCHVALUE (Recomendado para preenchimentos parciais de API)
              this.formulario.patchValue({
                endereco: {
                  rua: dados.logradouro,
                  bairro: dados.bairro,
                  cidade: dados.localidade,
                  estado: dados.uf
                }
              });

              /* 
                Nota sobre setValue():
                Se você quisesse usar o setValue(), seria obrigado a informar 
                TODOS os campos do grupo 'endereco', incluindo o próprio cep:
                
                this.formulario.setValue({
                  endereco: {
                    cep: cep, // obrigatório passar se não quiser que limpe
                    rua: dados.logradouro,
                    bairro: dados.bairro,
                    cidade: dados.localidade,
                    estado: dados.uf
                  }
                });
              */
            } else {
              alert('CEP não encontrado.');
            }
          },
          erro => console.error('Erro ao consultar CEP:', erro)
        );
    }
  }

  onSubmit() {
    if (this.formulario.valid) {
      console.log('Enviado:', this.formulario.value);
      alert('Endereço cadastrado com sucesso!');
      this.formulario.reset();
    }
  }
}
```
