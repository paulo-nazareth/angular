# Angular V2

## Aula 100 - Formulários: Criando um Serviço de Estados Brasileiros

Criar um serviço dedicado (`@Injectable`) para carregar dados estáticos de um arquivo JSON localizado na pasta `assets` (como uma lista de estados brasileiros) é a melhor prática para manter o código limpo, reutilizável e desacoplado dos componentes de formulário.

Abaixo está o passo a passo completo para estruturar o arquivo JSON, criar o serviço utilizando o módulo HTTP legado e consumi-lo em um formulário reativo para popular um campo `<select>`.


### 1. O Arquivo JSON (`assets/estados_br.json`)

Crie um arquivo chamado `estados_br.json` dentro da pasta `src/assets/` do seu projeto com a estrutura dos estados:

```JSON
[
  { "id": "1", "sigla": "AC", "nome": "Acre" },
  { "id": "2", "sigla": "AL", "nome": "Alagoas" },
  { "id": "3", "sigla": "AP", "nome": "Amapá" },
  { "id": "4", "sigla": "AM", "nome": "Amazonas" },
  { "id": "5", "sigla": "BA", "nome": "Bahia" }
]
```

### 2. Criando o Serviço (`estado.service.ts`)

O serviço utilizará o serviço `Http` do Angular 2 legado para realizar uma requisição GET local para o arquivo JSON e o operador `map` do RxJS para converter a resposta bruta em um objeto JSON utilizável.

```TypeScript
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class EstadoService {

  // Injetando o Http legado do Angular 2
  constructor(private http: Http) {}

  getEstados(): Observable<any[]> {
    return this.http.get('assets/estados_br.json')
      .map((response: Response) => response.json());
  }
}
```

### 3. Registrando o Serviço no Módulo (`app.module.ts`)

Como o serviço utiliza o `Http`, certifique-se de que o `HttpModule` está importado e o seu EstadoService está declarado na lista de `providers`:

```TypeScript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'; // Necessário para requisições HTTP

import { AppComponent } from './app.component';
import { CadastroEstadoComponent } from './cadastro-estado.component';
import { EstadoService } from './estado.service'; // Importando o serviço

@NgModule({
  imports: [ 
    BrowserModule, 
    ReactiveFormsModule, 
    HttpModule // Registrando o módulo HTTP legado
  ],
  declarations: [ 
    AppComponent, 
    CadastroEstadoComponent 
  ],
  providers: [ 
    EstadoService // Registrando o serviço no escopo global do módulo
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

Para didatica, criaremos um serviço para apresentação da lista de estados brasileiros.

```bash
# Cria o serviço DropdownService
ng g s shared/services/dropdown
```

    **Nota**: Necessário importar o HttpModule no SharedModule para o devido funcionamento.