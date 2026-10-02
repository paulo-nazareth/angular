# Angular V2

## Aula 64 - Usando Guarda de Rotas: CanActivate

No Angular, a Guarda de Rota `CanActivate` é uma interface utilizada para controlar o acesso a determinadas rotas. Ela funciona como um "porteiro" ou filtro: antes que o usuário consiga navegar para uma rota específica, o Angular executa o método `canActivate` da guarda. Se ele retornar `true`, a navegação prossegue; se retornar `false` (ou redirecionar o usuário), a navegação é bloqueada.

O caso de uso mais clássico é a autenticação (impedir que usuários não logados acessem telas protegidas, como o painel de alunos).

### Passo a Passo para Implementar o `CanActivate`

### 1. Criando o Serviço da Guarda
Você cria uma classe comum injetável que implementa a interface `CanActivate`. O método `canActivate` recebe informações sobre a rota e o estado atual, podendo retornar um valor booleano direto, uma `Promise` ou um `Observable`.

```TypeScript
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// Suponha que você tenha um serviço de autenticação
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    
    // Verifica se o usuário está autenticado
    if (this.authService.usuarioEstaAutenticado()) {
      return true; // Permite o acesso à rota
    }

    // Se não estiver, redireciona para a tela de login e bloqueia a rota
    this.router.navigate(['/login']);
    return false;
  }
}
```

### 2. Registrando a Guarda nos Provedores (`Providers`)

Como a guarda é um serviço do Angular, ela precisa ser declarada no array `providers` do seu módulo (geralmente no `AppModule` ou no módulo de funcionalidade correspondente):

```TypeScript
@NgModule({
  imports: [
    CommonModule,
    AlunosRoutingModule
  ],
  declarations: [
    AlunosComponent,
    AlunoDetalheComponent,
    AlunoFormComponent
  ],
  providers: [
    AuthGuard // Registrando a guarda aqui para ficar disponível
  ]
})
export class AlunosModule { }
```

### 3. Aplicando a Guarda na Rota

No arquivo de rotas (`routes`), basta adicionar a propriedade `canActivate` passando um array com as guardas que devem ser executadas antes de carregar o componente ou módulo:

```TypeScript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlunosComponent } from './alunos.component';
import { AlunoDetalheComponent } from './aluno-detalhe.component';
import { AlunoFormComponent } from './aluno-form.component';
import { AuthGuard } from './auth.guard'; // Importa a guarda

const alunosRoutes: Routes = [
  { 
    path: 'alunos', 
    component: AlunosComponent, 
    canActivate: [AuthGuard], // Protege o componente pai e todas as suas rotas filhas
    children: [
      { path: 'novo', component: AlunoFormComponent },
      { path: ':id', component: AlunoDetalheComponent },
      { path: ':id/editar', component: AlunoFormComponent }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(alunosRoutes)],
  exports: [RouterModule]
})
export class AlunosRoutingModule { }
```

### Outros Tipos de Guardas Úteis

Além do `CanActivate`, o ecossistema de rotas do Angular disponibiliza outras interfaces complementares para cenários específicos:

- `CanActivateChild`: Protege especificamente as rotas filhas de um componente pai, sem bloquear o pai.
- `CanDeactivate`: Útil para perguntar ao usuário se ele deseja realmente sair de um formulário preenchido mas não salvo (evitando perda de dados).
- `Resolve`: Permite buscar dados de um servidor antes de ativar a rota, garantindo que o componente só abra quando os dados já estiverem prontos.

Para exemplificação do conteúdo desta aula, foi criado o serviço:

```bash
ng g s guard/auth-guard
```

Após a criação dos arquivos, será renomeado manualmente.

```text
  create src\app\guard\auth-guard.service.spec.ts
  create src\app\guard\auth-guard.service.ts
```

Removendo o termo `service`, tendo em vista que não é um serviço

```text
  create src\app\guard\auth-guard.spec.ts
  create src\app\guard\auth-guard.ts
```

Necessário também renomear internamente e ajustar os `imports`.

**Nota**: Lembrando que o AuthGuard Criado é um `Injectable()`, o mesmo precisa ser declarado nos `providers` do `app.module.ts`.