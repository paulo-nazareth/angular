# Angular V2

## Aula 68 - Resolve: Carregando Dados antes da Rota ser Ativada

No ecossistema do Angular Versão 2, o mecanismo de Resolve é utilizado para pré-carregar dados assíncronos (como chamadas a uma API REST via Http) antes que o componente da rota seja ativado.

Isso evita que o componente seja renderizado vazio ou exiba telas de "Carregando..." enquanto aguarda a resposta da API, garantindo que a página só abra quando os dados estiverem completamente disponíveis.

### Estrutura da Implementação do `Resolve`

Para demonstrar o uso de um `Resolve` com o componente **Alunos**, dividiremos a implementação em 4 passos:

### 1. Criando o Serviço de Alunos

Este serviço simula a busca de dados de alunos (que normalmente viria de uma API HTTP).

Crie o arquivo `alunos.service.ts`:

```TypeScript
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

export interface Aluno {
  id: number;
  nome: string;
  email: string;
}

@Injectable()
export class AlunosService {
  private alunos: Aluno[] = [
    { id: 1, nome: 'Ana Silva', email: 'ana@email.com' },
    { id: 2, nome: 'Carlos Souza', email: 'carlos@email.com' },
    { id: 3, nome: 'Mariana Lima', email: 'mariana@email.com' }
  ];

  getAlunos(): Observable<Aluno[]> {
    // Simulando uma requisição assíncrona com atraso de 1 segundo
    return Observable.of(this.alunos).delay(1000);
  }
}
```

### 2. Criando a Classe de Resolução (Resolve)

A classe implementa a interface genérica `Resolve<T>` do `@angular/router`. O método resolve é executado automaticamente pelo roteador antes de carregar o componente.

Crie o arquivo `alunos-resolver.service.ts`:

```TypeScript
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AlunosService, Aluno } from './alunos.service';

@Injectable()
export class AlunosResolver implements Resolve<Aluno[]> {
  
  constructor(private alunosService: AlunosService) {}

  resolve(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): Observable<Aluno[]> | Promise<Aluno[]> | any {
    // O roteador aguarda este Observable emitir o valor para prosseguir com a navegação
    return this.alunosService.getAlunos();
  }
}
```

### 3. Criando o Componente Alunos

No componente, você consome os dados resolvidos diretamente do `ActivatedRoute` através da propriedade `data`.

Crie o arquivo `alunos.component.ts`:

```TypeScript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Aluno } from './alunos.service';

@Component({
  selector: 'app-alunos',
  template: `
    <h2>Lista de Alunos (Pré-carregada via Resolve)</h2>
    <ul>
      <li *ngFor="let aluno of alunos">
        <strong>{{ aluno.nome }}</strong> - {{ aluno.email }}
      </li>
    </ul>
  `
})
export class AlunosComponent implements OnInit {
  alunos: Aluno[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Os dados já chegam prontos através do snapshot de dados da rota
    this.route.data.forEach((data: { alunos: Aluno[] }) => {
      this.alunos = data.alunos;
    });
  }
}
```

### 4. Registrando no Módulo e nas Rotas

Assim como as guardas no Angular 2, os resolvers devem ser registrados no array `providers` do `NgModule` e atrelados à propriedade `resolve` da rota correspondente.

```TypeScript
// app.routing.ts
import { Routes, RouterModule } from '@angular/router';
import { AlunosComponent } from './alunos.component';
import { AlunosResolver } from './alunos-resolver.service';

const appRoutes: Routes = [
  { 
    path: 'alunos', 
    component: AlunosComponent, 
    resolve: { alunos: AlunosResolver } // 'alunos' será a chave injetada no ActivatedRoute.data
  }
];

export const routing = RouterModule.forRoot(appRoutes);
```

```TypeScript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http'; // Necessário para requisições no Angular 2
import { AppComponent } from './app.component';
import { AlunosComponent } from './alunos.component';
import { AlunosService } from './alunos.service';
import { AlunosResolver } from './alunos-resolver.service';
import { routing } from './app.routing';

@NgModule({
  imports: [ BrowserModule, HttpModule, routing ],
  declarations: [ AppComponent, AlunosComponent ],
  providers: [ 
    AlunosService, 
    AlunosResolver // OBRIGATÓRIO no provedor do módulo do Angular 2
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```
