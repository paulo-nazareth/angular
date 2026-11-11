import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private http: Http
  ) { }

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

  onSubmit(){
    console.log(this.formulario);
    this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
        .map(res => res)
        .subscribe(dados => console.log(dados));
  }

}
