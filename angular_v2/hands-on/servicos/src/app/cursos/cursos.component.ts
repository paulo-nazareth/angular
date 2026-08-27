import { Component, OnInit } from '@angular/core';

import { CursosService } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
  , providers: [ CursosService ]
})
export class CursosComponent implements OnInit {

  cursos: string[] = [];

  constructor(private cursosService: CursosService) { }

  ngOnInit() {
    this.cursos = this.cursosService.getCursos();
  }

  /* Declaração do Serviço Manual (sem injeção de dependência) */
  // cursosService: CursosService;

  // constructor() { 
  //   this.cursosService = new CursosService();
  // }
  // OU
  // constructor(_cursosService: CursosService) { 
  //   this.cursosService = this._cursosService;
  // }

  // ngOnInit() {
  //   this.cursos = this.cursosService.getCursos();
  // }

}
