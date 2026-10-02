import { NgModule } from "@angular/core";
import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CursosComponent } from "./cursos.component";
import { CursoDetalheComponent } from "./curso-detalhe/curso-detalhe.component";
import { CursoNaoEncontradoComponent } from "./curso-nao-encontrado/curso-nao-encontrado.component";

const cursosRoutes: Routes = [
    { path: '', component: CursosComponent }, //(Removido a declaração do path cursos, devido o Lazy Loading, deixando em branco)
    { path: 'naoEncontrado', component: CursoNaoEncontradoComponent },
    { path: ':id', component: CursoDetalheComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(cursosRoutes) ],
    exports: [ RouterModule ]
})
export class CursosRoutingModule {

}