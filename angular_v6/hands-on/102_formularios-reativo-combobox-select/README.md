# Angular v6

## Aula 102 - Formulários Reativos: Combobox Simples (select)

No Angular 6, usar o pipe `async` diretamente no `<select>` permite consumir o `Observable` retornado pelo serviço sem chamar `.subscribe()` manualmente no componente nem se preocupar com vazamento de memória ao destruir o componente.

### 1. Serviço de estados com providedIn: 'root' (`dropdown.service.ts`)

Tipar o `HttpClient.get<EstadoBr[]>()` garante que o `Observable` emita um array de `EstadoBr` e evita o erro de tipo `Object`:

```TypeScript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstadoBr } from './estado-br';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) {}

  getEstadosBr(): Observable<EstadoBr[]> {
    return this.http.get<EstadoBr[]>('assets/dados/estadosbr.json');
  }
}
```

### 2. Componente com formulário reativo e `Observable` (`data-form.component.ts`)

Em vez de armazenar `estados: EstadoBr[]` via `.subscribe()`, exponha `estados$: Observable<EstadoBr[]>` e associe o controle `estado` ao `FormGroup`:

```TypeScript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DropdownService } from './dropdown.service';
import { EstadoBr } from './estado-br';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html'
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;
  estados$: Observable<EstadoBr[]>;

  constructor(
    private formBuilder: FormBuilder,
    private dropdownService: DropdownService
  ) {}

  ngOnInit() {
    this.estados$ = this.dropdownService.getEstadosBr();

    this.formulario = this.formBuilder.group({
      estado: [null]
    });
  }
}
```

### 3. Template com `<select>` e pipe `async` (`data-form.component.html`)

O pipe `async` inscreve-se no `Observable`, aguarda a emissão e itera com `*ngFor`:

```HTML
<form [formGroup]="formulario">
  <div>
    <label for="estado">Estado</label>
    <select id="estado" formControlName="estado">
      <option [ngValue]="null">Selecione um estado</option>
      <option *ngFor="let estado of estados$ | async" [ngValue]="estado.sigla">
        {{ estado.nome }}
      </option>
    </select>
  </div>
</form>
```

# Complementar

No RxJS 6 (usado no Angular 6), o `shareReplay(1)` faz duas coisas essenciais para o carregamento de estados:

1. **Compartilha a mesma execução (`multicast`)**: se o template usar `estados$ | async` em dois lugares (por exemplo, no `<select>` e em um indicador de carregamento ou outro componente), ele faz apenas uma requisição HTTP em vez de várias.
2. **Armazena o último valor emitido (`replay` de 1 item)**: novos assinantes (ou o pipe `async` quando o bloco/componente é renderizado depois) recebem imediatamente a lista de estados em memória sem disparar nova chamada ao assets/dados/estadosbr.json.

### Atenção no RxJS 6 com `shareReplay(1)`

- **Assinatura do `shareReplay` no RxJS 6**: no RxJS 6, `shareReplay(1)` aceita o tamanho do buffer (1) como primeiro argumento; não é necessário passar `refCount` manualmente a menos que você queira controle específico de cancelamento quando todos os inscritos saem.
- **Dados estáticos vs. dados mutáveis**: `shareReplay(1)` é ideal para listas de referência (estados, países, perfis, domínios estáticos). Se os dados precisarem ser recarregados sob demanda, crie um método explícito (ex.: `recarregarEstados()`) que resete `this.estados$ = null`.