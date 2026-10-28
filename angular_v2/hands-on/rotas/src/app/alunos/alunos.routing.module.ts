import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AlunosComponent } from "./alunos.component";
import { AlunoDetalheComponent } from "./aluno-detalhe/aluno-detalhe.component";
import { AlunoFormComponent } from "./aluno-form/aluno-form.component";
import { AlunosGuard } from "app/guards/alunos.guard";
import { AlunosDeactivateGuard } from "app/guards/alunos.deactivate.guard";
import { AlunoDetalheResolver } from "./guards/aluno-detalhe.resolver";

const alunosRoutes: Routes = [
    { path: '', component: AlunosComponent,
        canActivateChild: [ AlunosGuard ],
        // Rotas Filhas (children) 
        children: [
        // Rota para formulário de novo aluno (ex: /alunos/novo)
        { path: 'novo', component: AlunoFormComponent },

        // Rota para detalhar um aluno específico por ID (ex: /alunos/10)
        { path: ':id', component: AlunoDetalheComponent,
            resolve: { aluno: AlunoDetalheResolver }
         },

        // Rota para editar um aluno existente (ex: /alunos/10/editar)
        { path: ':id/editar', component: AlunoFormComponent,
            canDeactivate: [ AlunosDeactivateGuard ]
        }
    ] }
];

@NgModule({
    imports: [ RouterModule.forChild(alunosRoutes) ],
    exports: [ RouterModule ]
})
export class AlunosRoutingModule {

}