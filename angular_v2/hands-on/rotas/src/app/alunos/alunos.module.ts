import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AlunosComponent } from "./alunos.component";
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { AlunosRoutingModule } from "./aluno.routing.module";

@NgModule({
    /* O BrowserModule só pode ser declarado no app.module.ts, nos demais módulos é declarado o CommonModule */
    imports: [ 
        CommonModule,
        AlunosRoutingModule
    ],
    exports: [],
    declarations: [
        AlunosComponent,
        AlunoFormComponent,
        AlunoDetalheComponent
    ],
    providers: [ ]
})
export class AlunosModule {

}