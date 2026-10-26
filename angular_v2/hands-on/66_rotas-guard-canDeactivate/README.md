# Angular V2

## Aula 66 - Usando Guarda de Rotas: CanDeactivate

A guarda `CanDeactivate<T>` é utilizada para interceptar a saída de uma rota, impedindo que o usuário navegue para fora de uma página caso existam condições pendentes (como um formulário com dados não salvos).

### Estrutura da Implementação no Angular 2

Para criar uma guarda `CanDeactivate` reutilizável e limpa no Angular 2, costuma-se seguir um padrão de 4 passos:

### 1. Criar uma Interface para o Componente

Isso garante que qualquer componente que use essa guarda possua um contrato claro para verificar o estado de saída.

Crie o arquivo `can-component-deactivate.interface.ts`:

```TypeScript
import { Observable } from 'rxjs/Observable';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
```

### 2. Criar a Classe da Guarda

No Angular 2, a guarda implementa a interface genérica `CanDeactivate<T>` do `@angular/router`:

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
    
    // Se o componente implementar a função, chama-a; caso contrário, permite a saída
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
```

### 3. Implementar o Componente

O componente implementa a interface criada e define a lógica de confirmação (`window.confirm` ou diálogo customizado):  

Crie o arquivo `edit-form.component.ts`:

```TypeScript
import { Component } from '@angular/core';
import { CanComponentDeactivate } from './can-component-deactivate.interface';

@Component({
  selector: 'app-edit-form',
  template: `
    <h2>Editar Cadastro (Angular 2)</h2>
    <input [(ngModel)]="nome" placeholder="Digite seu nome" />
    <br><br>
    <button (click)="salvar()">Salvar</button>
  `
})
export class EditFormComponent implements CanComponentDeactivate {
  nome: string = '';
  formSalvo: boolean = false;

  canDeactivate(): boolean {
    // Se alterou o campo e não salvou, pergunta ao usuário
    if (this.nome.trim() !== '' && !this.formSalvo) {
      return window.confirm('Você tem alterações não salvas. Deseja realmente sair da página?');
    }
    return true;
  }

  salvar() {
    this.formSalvo = true;
    alert('Dados salvos com sucesso!');
  }
}
```

### 4. Registrar no Módulo e nas Rotas (`AppModule` e `Routing`)

No Angular 2, a guarda **precisa obrigatoriamente ser declarada no array** `providers` do seu NgModule para que o sistema de injeção de dependência consiga instanciá-la.

```TypeScript
// app.routing.ts
import { Routes, RouterModule } from '@angular/router';
import { EditFormComponent } from './edit-form.component';
import { CanDeactivateGuard } from './can-deactivate.guard';

const appRoutes: Routes = [
  { 
    path: 'editar', 
    component: EditFormComponent, 
    canDeactivate: [CanDeactivateGuard] // Atribuída à rota
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
import { EditFormComponent } from './edit-form.component';
import { routing } from './app.routing';
import { CanDeactivateGuard } from './can-deactivate.guard';

@NgModule({
  imports: [ BrowserModule, FormsModule, routing ],
  declarations: [ AppComponent, EditFormComponent ],
  providers: [ CanDeactivateGuard ], // OBRIGATÓRIO no Angular 2
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```