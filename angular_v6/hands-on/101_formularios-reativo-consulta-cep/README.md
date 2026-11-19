# Angular v6

## Aula 101 - Formulários: Serviço de Consulta CEP + provideIn

No Angular 6, duas novidades centrais se encaixam perfeitamente nesse cenário: o `providedIn: 'root'` no decorador `@Injectable` (que dispensa registrar o serviço manualmente no providers do `AppModule` e habilita tree-shaking) e os Formulários Reativos com `HttpClient`.

Abaixo está um exemplo completo de serviço de consulta de CEP (usando a API pública do ViaCEP) integrado a um formulário reativo no Angular 6.

### 1. Interface do endereço (`endereco-cep.ts`)

Tipar a resposta evita erros de tipo (como `Object` não atribuível) e facilita o preenchimento do formulário:

```TypeScript
export interface EnderecoCep {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}
```

### 2. Serviço de consulta de CEP com `providedIn: 'root'` (`consulta-cep.service.ts`)

A partir do Angular 6, você declara `providedIn: 'root'` diretamente no `@Injectable`. Não é preciso adicionar `ConsultaCepService` no array `providers` de nenhum módulo.

```TypeScript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnderecoCep } from './endereco-cep';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  private readonly viaCepUrl = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) {}

  buscarPorCep(cep: string): Observable<EnderecoCep> {
    const cepLimpo = cep.replace(/\D/g, '');
    return this.http.get<EnderecoCep>(`${this.viaCepUrl}/${cepLimpo}/json/`);
  }
}
```

    Nota sobre RxJS no Angular 6: o Angular 6 utiliza o RxJS 6 (rxjs e rxjs/operators), com importações como import { Observable } from 'rxjs';. Se o seu projeto ainda usa rxjs-compat durante a migração, importações antigas também podem coexistir temporariamente.

### 3. Formulário reativo consumindo o serviço

Certifique-se de importar `ReactiveFormsModule` (e `HttpClientModule`) no módulo do seu componente.

Componente (`endereco-form.component.ts`)

```TypeScript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultaCepService } from './consulta-cep.service';
import { EnderecoCep } from './endereco-cep';

@Component({
  selector: 'app-endereco-form',
  templateUrl: './endereco-form.component.html'
})
export class EnderecoFormComponent implements OnInit {

  formulario: FormGroup;
  carregandoCep = false;

  constructor(
    private formBuilder: FormBuilder,
    private cepService: ConsultaCepService
  ) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      cep: [null, [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],
      logradouro: [null, Validators.required],
      complemento: [null],
      bairro: [null, Validators.required],
      cidade: [null, Validators.required],
      estado: [null, Validators.required]
    });
  }

  consultaCEP() {
    const cepControl = this.formulario.get('cep');
    const cepValor = cepControl ? cepControl.value : '';

    if (!cepValor) {
      return;
    }

    const cepLimpo = cepValor.replace(/\D/g, '');

    if (/^[0-9]{8}$/.test(cepLimpo)) {
      this.resetaDadosForm();
      this.carregandoCep = true;

      this.cepService.buscarPorCep(cepLimpo).subscribe(
        (dados: EnderecoCep) => {
          this.carregandoCep = false;
          if (!dados.erro) {
            this.populaDadosForm(dados);
          }
        },
        () => {
          this.carregandoCep = false;
        }
      );
    }
  }

  private populaDadosForm(dados: EnderecoCep) {
    this.formulario.patchValue({
      logradouro: dados.logradouro,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    });
  }

  private resetaDadosForm() {
    this.formulario.patchValue({
      logradouro: null,
      complemento: null,
      bairro: null,
      cidade: null,
      estado: null
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      console.log(this.formulario.value);
    } else {
      this.formulario.markAllAsTouched();
    }
  }
}
```

**Observação**: no Angular 6, `markAllAsTouched()` ainda não existia — ele só entrou no Angular 9. Para marcar todos os controles no Angular 6, itere sobre `Object.keys(this.formulario.controls)` marcando cada `AbstractControl` com `markAsTouched({ onlySelf: true })`.

Template (`endereco-form.component.html`)

```HTML
<form [formGroup]="formulario" (ngSubmit)="onSubmit()">
  <div>
    <label for="cep">CEP</label>
    <input
      id="cep"
      type="text"
      formControlName="cep"
      (blur)="consultaCEP()"
      placeholder="00000-000"
    />
    <span *ngIf="carregandoCep">Buscando CEP...</span>
  </div>

  <div>
    <label for="logradouro">Logradouro</label>
    <input id="logradouro" type="text" formControlName="logradouro" />
  </div>

  <div>
    <label for="complemento">Complemento</label>
    <input id="complemento" type="text" formControlName="complemento" />
  </div>

  <div>
    <label for="bairro">Bairro</label>
    <input id="bairro" type="text" formControlName="bairro" />
  </div>

  <div>
    <label for="cidade">Cidade</label>
    <input id="cidade" type="text" formControlName="cidade" />
  </div>

  <div>
    <label for="estado">Estado</label>
    <input id="estado" type="text" formControlName="estado" />
  </div>

  <button type="submit" [disabled]="formulario.invalid">Salvar</button>
</form>
```

### Pontos de atenção no Angular 6

- **Campos desabilitados (`disabled: true)`**: se você desabilitar campos como `cidade` ou `estado` no `FormBuilder`, lembre-se de que `this.formulario.value` omite controles desabilitados; use `this.formulario.getRawValue()` se precisar enviá-los no `onSubmit()`.