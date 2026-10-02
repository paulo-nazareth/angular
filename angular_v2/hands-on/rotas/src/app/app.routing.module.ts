import { NgModule } from "@angular/core";
import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./guards/auth-guard";
// import { CursosComponent } from "./cursos/cursos.component";
// import { CursoDetalheComponent } from "./cursos/curso-detalhe/curso-detalhe.component";
// import { CursoNaoEncontradoComponent } from "./cursos/curso-nao-encontrado/curso-nao-encontrado.component";

const appRoutes: Routes = [
    { path: 'cursos', loadChildren: 'app/cursos/cursos.module#CursosModule',
        canActivate: [ AuthGuard ]
     },
    { path: 'alunos', loadChildren: 'app/alunos/alunos.module#AlunosModule',
        canActivate: [ AuthGuard ]
     },
    // { path: 'cursos', component: CursosComponent },
    // { path: 'curso/:id', component: CursoDetalheComponent },
    { path: 'login', component: LoginComponent },
    // { path: 'naoEncontrado', component: CursoNaoEncontradoComponent },
    { path: '', component: HomeComponent, canActivate: [ AuthGuard ] }
];

//Pode ser declarado diretamente no forRoot (removendo a constante)
@NgModule({
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {

}