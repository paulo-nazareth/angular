import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AlunosComponent } from "./alunos.component";
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { AlunosService } from "./alunos.service";
import { AlunosRoutingModule } from "./alunos.routing.module";
import { AlunosDeactivateGuard } from "app/guards/alunos.deactivate.guard";
import { AlunoDetalheResolver } from "./guards/aluno-detalhe.resolver";

@NgModule({
    /* O BrowserModule só pode ser declarado no app.module.ts, nos demais módulos é declarado o CommonModule */
    imports: [ 
        CommonModule,
        FormsModule,
        AlunosRoutingModule
    ],
    exports: [],
    declarations: [
        AlunosComponent,
        AlunoFormComponent,
        AlunoDetalheComponent
    ],
    providers: [ 
        AlunosService,
        AlunosDeactivateGuard,
        AlunoDetalheResolver
    ]
})
export class AlunosModule {

}