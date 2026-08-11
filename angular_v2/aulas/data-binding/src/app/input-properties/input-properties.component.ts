import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cursos', //Renomeado para fins didatico de app-input-properties para app-cursos
  templateUrl: './input-properties.component.html',
  styleUrls: ['./input-properties.component.css']
  //, inputs: ['nomeCurso:nome'] //Exemplo3
})
export class InputPropertiesComponent implements OnInit {

  /* Exemplo quando o nome do atributo é o mesmo da variável*/
  //@Input() nome: string = ''; 

  //Quando o nome do atributo é diferente do nome da variável (Mais Usual)
  @Input('nome') nomeCurso: string = '';  

  /* Declarando nos metadados @Component({ inputs: ['nomeCurso:nome'] })
   * Dificil manutenção quando possui mais de uma variavel
  */

  constructor() { }

  ngOnInit() {
  }

}
