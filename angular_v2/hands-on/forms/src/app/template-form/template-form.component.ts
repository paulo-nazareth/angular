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

  onSubmit(formulario: NgForm){
    console.log(formulario);
    // console.log(formulario.value);
    // console.log(this.usuario);
    // this.http.post('endereco-servidor/form-usuario', JSON.stringify(formulario.value))
    this.http.post('https://httpbin.org/post', JSON.stringify(formulario.value))
        .map(res => res)
        .subscribe(
          dados => {
            console.log(dados);
            formulario.form.reset();
          },
          (error => alert('Error: '+ error))
        );
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

  consultaCEP(cep: string, form: NgForm){
    console.log(cep);
    //Nova variável "cep" somente com dígitos.
    var cep = cep.replace(/\D/g, '');
    //Verifica se campo cep possui valor informado.
    if (cep != "") {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;
        //Valida o formato do CEP.
        if(validacep.test(cep)) {
          this.resetaDadosForm(form);

          // this.http.get("https://viacep.com.br/ws/"+ cep +"/json"); Substituido pelo Template Literal, exemplo abaixo
          this.http.get(`https://viacep.com.br/ws/${cep}/json`)
            .map(dados => dados.json())
            // .subscribe(function(dados){});
            .subscribe(dados => this.popularDadosForm(dados, form));
        }
    }
  }

  popularDadosForm(dados: any, formulario: NgForm){
    console.log();
    /* Exige que seja informado a estrutura completa de todos os campos do formulário de uma só vez. Se faltar qualquer campo, o Angular dispara um erro no console.
    formulario.setValue({
        nome: formulario.value.nome,
        email: formulario.value.email,
        endereco: {
          cep: dados.cep,
          rua: dados.logradouro,
          numero: '',
          complemento: dados.complemento,
          bairro: dados.bairro,
          cidade: dados.localidade,
          estado: dados.uf
        }
    });
    */
    formulario.form.patchValue({
        endereco: {
          cep: dados.cep,
          rua: dados.logradouro,
          complemento: dados.complemento,
          bairro: dados.bairro,
          cidade: dados.localidade,
          estado: dados.uf
        }
    });
  }

  resetaDadosForm(formulario: NgForm){
    formulario.form.patchValue({
        endereco: {
          cep: null,
          rua: null,
          complemento: null,
          bairro: null,
          cidade: null,
          estado: null
        }
    });
  }

}
