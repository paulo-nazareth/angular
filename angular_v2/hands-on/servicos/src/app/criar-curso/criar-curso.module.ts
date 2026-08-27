import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CursosService } from '../cursos/cursos.service';
import { CriarCursoComponent } from './criar-curso.component';

@NgModule({
  declarations: [
    CriarCursoComponent
  ],
  imports: [
    CommonModule //Módulo de funcionalidade sem ser o módulo raiz passa a utilizar o CommonModule no lugar do BrowserModule
  ],
  providers: [ CursosService ],
  exports: [ CriarCursoComponent ]
})
export class CriarCursoModule { }
