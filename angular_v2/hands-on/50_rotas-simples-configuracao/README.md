# Angular V2

## Aula 50 - Rotas: Configurando Rotas Simples

Para esta aula, foi criados 3 novos componentes (`home`, `login` e `cursos`):

```bash
# Criando Componente Home
ng g c home

# Criando Componente Login
ng g c login

# Criando Componente Cursos
ng g c cursos
```

### Elementos Fundamentais do Roteamento

- `Routes`: Um array de objetos que define o mapeamento entre o caminho da URL (`path`) e o componente que deve ser exibido (`component`).
- `RouterModule`: O módulo nativo que fornece as diretivas e os serviços de roteamento para a aplicação.
- `<router-outlet>`: Diretiva que atua como um marcador/contêiner no HTML onde o Angular renderiza dinamicamente o componente da rota ativa.
- `routerLink`: Diretiva usada nas tags `<a>` ou botões para navegar entre rotas sem disparar o recarregamento da página.

### Configuração Básica Passo a Passo

#### 1. Definindo as Rotas (`app-routing.module.ts` ou `app.module.ts`)

```TypeScript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SobreComponent } from './sobre/sobre.component';
import { NaoEncontradoComponent } from './nao-encontrado/nao-encontrado.component';

const routes: Routes = [
  // Rota padrão (redireciona a raiz para /home)
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  
  // Rotas normais
  { path: 'home', component: HomeComponent },
  { path: 'sobre', component: SobreComponent },

  // Rota wildcard (coringa) para erro 404 (deve ser a última da lista)
  { path: '**', component: NaoEncontradoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

#### 2. Adicionando os Links de Navegação e o Contêiner (app.component.html)

```HTML
<nav>
  <!-- Use routerLink em vez de href para evitar o reload da página -->
  <a routerLink="/home" routerLinkActive="ativo">Início</a>
  <a routerLink="/sobre" routerLinkActive="ativo">Sobre Nós</a>
</nav>

<!-- O componente da rota correspondente será renderizado aqui -->
<main>
  <router-outlet></router-outlet>
</main>
```

    **Nota**: A diretiva `routerLinkActive="nome-da-classe"` adiciona automaticamente uma classe CSS ao elemento quando a rota dele estiver ativa.

### Navegação Programática via TypeScript

Além do `routerLink` no HTML, é possível navegar via código usando o serviço `Router`:

```TypeScript
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `<button (click)="fazerLogin()">Entrar</button>`
})
export class LoginComponent {

  constructor(private router: Router) {}

  fazerLogin() {
    // Lógica de autenticação...
    
    // Redireciona o usuário para a rota '/home' via código
    this.router.navigate(['/home']);
  }
}
```