# Angular V2

## Aula 69 - CanLoad: Como Não Carregar a Rota/Módulo Sem Permissão

No ecossistema do Angular Versão 2, a guarda de rotas `CanLoad` tem um papel fundamental e estratégico na segurança e performance: ela é utilizada para decidir se um módulo carregado sob demanda (**Lazy Loading**) deve ou não ser baixado da rede e instanciado na memória.

Enquanto o `CanActivate` executa a verificação depois que o módulo já foi baixado, o `CanLoad` **intercepta antes**, bloqueando o download do arquivo JavaScript do módulo caso o usuário não tenha permissão (por exemplo, impedindo que um usuário comum baixe o código de uma área administrativa inteira).

### Como Implementar o `CanLoad` no Angular 2

Para aplicar o `CanLoad` com um serviço de autenticação (`AuthService`) no Angular 2, siga os passos abaixo:

### 1. Criar a Guarda Implementando CanLoad

A classe deve implementar a interface `CanLoad` do `@angular/router`.

Crie o arquivo `auth-guard.service.ts`:

```TypeScript
import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router) {}

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    // Verifica se o usuário está autenticado ou tem o perfil necessário
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // Se não estiver autenticado, redireciona para o login e bloqueia o load
    console.log('Acesso negado: Módulo não será carregado.');
    this.router.navigate(['/login']);
    return false;
  }
}
```

### 2. Configurar o Lazy Loading e a Guarda nas Rotas

No Angular 2, as rotas com carregamento tardio utilizam a sintaxe de string com `#` no caminho do `loadChildren`. A propriedade `canLoad` é aplicada diretamente nessa rota.

Crie ou atualize o arquivo `app.routing.ts`:

```TypeScript
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { HomeComponent } from './home.component';
import { AuthGuard } from './auth-guard.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'admin', 
    loadChildren: './admin/admin.module#AdminModule', // Sintaxe de Lazy Loading do Angular 2
    canLoad: [AuthGuard] // Impede o download do módulo se retornar false
  }
];

export const routing = RouterModule.forRoot(appRoutes);
```

