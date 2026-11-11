import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    /* 1º Forma de Criar um Formulário */
    // this.formulario = new FormGroup({
    //   nome: new FormControl(null), // Pode ser Informado um Valor Inicial new FormControl('Paulo')
    //   email: new FormControl(null)
    // });
      
    /* 2º Forma de Criar um Formulário */
    this.formulario = this.formBuilder.group({
      nome: [null],
      email: [null]
    });
  }

}
