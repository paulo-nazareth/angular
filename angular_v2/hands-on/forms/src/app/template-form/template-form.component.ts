import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: "",
    email: ""
  }

  constructor(private http: Http) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    console.log(form);
    // console.log(form.value);
    // console.log(this.usuario);
  }

  // Regex definida como objeto nativo do JS (evita o erro de compilação do HTML)
  /*emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*$/;*/

  verificaValidTouched(campo: NgModel){
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo: NgModel){
    return {
        'has-error': this.verificaValidTouched(campo),
        'has-feedback': this.verificaValidTouched(campo)
    }
  }

  consultaCEP(cep: string){
    console.log(cep);
    //Nova variável "cep" somente com dígitos.
    var cep = cep.replace(/\D/g, '');
    //Verifica se campo cep possui valor informado.
    if (cep != "") {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;
        //Valida o formato do CEP.
        if(validacep.test(cep)) {
          // this.http.get("https://viacep.com.br/ws/"+ cep +"/json"); Substituido pelo Template Literal, exemplo abaixo
          this.http.get(`https://viacep.com.br/ws/${cep}/json`)
            .map(dados => dados.json())
            // .subscribe(function(dados){});
            .subscribe(dados => console.log(dados));
        }
    }
  }

}
