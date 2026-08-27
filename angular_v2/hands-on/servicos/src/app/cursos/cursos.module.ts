import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CursosService } from './cursos.service';
import { CursosComponent } from './cursos.component';

@NgModule({
  declarations: [
    CursosComponent
  ],
  imports: [
    CommonModule //Módulo de funcionalidade sem ser o módulo raiz passa a utilizar o CommonModule no lugar do BrowserModule
  ],
  // providers: [ CursosService ],
  exports: [ CursosComponent ]
})
export class CursosModule { }
