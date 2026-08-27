import { Component, OnInit } from '@angular/core';

import { CursosService } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  nomePortal: string;

  cursos: string[];

  constructor(private cursosService: CursosService) { 
    this.nomePortal = "http://google.com";
    /*Substituído pela injeção de dependência através do Construtor*/
    //var cursosService = new CursosService();
    this.cursos = cursosService.getCursos();
  }

  ngOnInit() {
  }

}
