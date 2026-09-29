import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AlunosComponent } from "./alunos.component";
import { AlunoDetalheComponent } from "./aluno-detalhe/aluno-detalhe.component";
import { AlunoFormComponent } from "./aluno-form/aluno-form.component";

const alunosRoutes: Routes = [
    { path: 'alunos', component: AlunosComponent,
        // Rotas Filhas (children) 
        children: [
        // Rota para formulário de novo aluno (ex: /alunos/novo)
        { path: 'novo', component: AlunoFormComponent },

        // Rota para detalhar um aluno específico por ID (ex: /alunos/10)
        { path: ':id', component: AlunoDetalheComponent },

        // Rota para editar um aluno existente (ex: /alunos/10/editar)
        { path: ':id/editar', component: AlunoFormComponent }
    ] }
];

@NgModule({
    imports: [ RouterModule.forChild(alunosRoutes) ],
    exports: [ RouterModule ]
})
export class AlunosRoutingModule {

}