import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// import { RouterModule } from "@angular/router";

import { CursosComponent } from "./cursos.component";
import { CursoDetalheComponent } from "./curso-detalhe/curso-detalhe.component";
import { CursoNaoEncontradoComponent } from "./curso-nao-encontrado/curso-nao-encontrado.component";
import { CursosService } from "./cursos.service";
import { CursosRoutingModule } from "./cursos.routing.module";

@NgModule({
    /* O BrowserModule só pode ser declarado no app.module.ts, nos demais módulos é declarado o CommonModule */
    imports: [ 
        CommonModule,
        /*RouterModule (removido, pois já esta sendo importado no CursosRoutingModule)*/
        CursosRoutingModule
    ],
    exports: [],
    declarations: [
        CursosComponent,
        CursoDetalheComponent,
        CursoNaoEncontradoComponent
    ],
    providers: [ CursosService ]
})
export class CursosModule {

}