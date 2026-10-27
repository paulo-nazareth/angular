# Angular V2

## Aula 67 - Usando Guarda de Rotas: CanDeactivate com Interface Genérica

No ecossistema do Angular Versão 2, a utilização da interface genérica `CanDeactivate<T>` é a abordagem padrão e mais elegante para proteger rotas contra saídas indesejadas (como perda de dados em formulários não salvos).

O parâmetro genérico `<T>` representa o **contrato (interface)** que o componente de destino deve implementar, garantindo forte tipagem em tempo de compilação e segurança na injeção do componente dentro da guarda.

### Arquitetura da Solução com `CanDeactivate<T>`

Para implementar essa guarda genérica, dividimos o código em 4 partes principais:

### 1. Criando a Interface do Componente (T)

Esta interface define o contrato que qualquer componente protegido pela guarda deve cumprir.

Crie o arquivo `can-component-deactivate.interface.ts`:

```TypeScript
import { Observable } from 'rxjs/Observable';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
```

### 2. Implementando a Guarda Genérica

A classe da guarda implementa `CanDeactivate<CanComponentDeactivate>`, o que significa que o parâmetro `component` recebido no método `canDeactivate` será obrigatoriamente tipado com esse contrato, garantindo acesso direto ao método de verificação.

Crie o arquivo `can-deactivate.guard.ts`:

```TypeScript
import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CanComponentDeactivate } from './can-component-deactivate.interface';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(
    component: CanComponentDeactivate,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    
    // Como o componente implementa a interface CanComponentDeactivate, 
    // temos certeza tipada de que o método canDeactivate existe aqui.
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
```

### 3. Criando o Componente que Implementa o Contrato

O componente assina a interface `CanComponentDeactivate` e implementa a lógica para decidir se o usuário pode ou não sair da página.

Crie o arquivo `cadastro-produto.component.ts`:

```TypeScript
import { Component } from '@angular/core';
import { CanComponentDeactivate } from './can-component-deactivate.interface';

@Component({
  selector: 'app-cadastro-produto',
  template: `
    <h2>Cadastro de Produto (Angular 2)</h2>
    <input [(ngModel)]="nomeProduto" placeholder="Nome do produto" />
    <br><br>
    <button (click)="salvar()">Salvar Produto</button>
  `
})
export class CadastroProdutoComponent implements CanComponentDeactivate {
  nomeProduto: string = '';
  salvo: boolean = false;

  // Implementação exigida pela interface genérica
  canDeactivate(): boolean {
    if (this.nomeProduto.trim() !== '' && !this.salvo) {
      return window.confirm('Você tem alterações não salvas. Deseja sair sem salvar?');
    }
    return true;
  }

  salvar() {
    this.salvo = true;
    alert('Produto salvo com sucesso!');
  }
}
```

### 4. Registrando no Módulo e nas Rotas

No Angular 2, guardas baseadas em classe precisam ser registradas no array `providers` do `NgModule`.

```TypeScript
// app.routing.ts
import { Routes, RouterModule } from '@angular/router';
import { CadastroProdutoComponent } from './cadastro-produto.component';
import { CanDeactivateGuard } from './can-deactivate.guard';

const appRoutes: Routes = [
  { 
    path: 'produto/novo', 
    component: CadastroProdutoComponent, 
    canDeactivate: [CanDeactivateGuard] // Atribuindo a guarda genérica
  }
];

export const routing = RouterModule.forRoot(appRoutes);
```

```TypeScript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CadastroProdutoComponent } from './cadastro-produto.component';
import { routing } from './app.routing';
import { CanDeactivateGuard } from './can-deactivate.guard';

@NgModule({
  imports: [ BrowserModule, FormsModule, routing ],
  declarations: [ AppComponent, CadastroProdutoComponent ],
  providers: [ CanDeactivateGuard ], // Obrigatório no Angular 2
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

