import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      // nome: [ null, [ Validators.required, Validators.minLength(3), Validators.maxLength(200) ] ],
      nome: [ null, Validators.required ],
      //email: [ null, [ Validators.required, Validators.email ]] // Na versão 2, não possui o Validators.email, por isto a validação foi realizada através de uma expressão regular (pattern)
      email: [ null, [ Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?") ]]
    });
  }

  onSubmit(){
    console.log(this.formulario);
    this.http.post(
          'https://httpbin.org/post', 
          JSON.stringify(this.formulario.value)
        ).map(res => res)
        .subscribe(
          dados => {
            console.log(dados);
            // Reseta o formulário após o sucesso do envio
            this.formulario.reset();
          },
          (error: any) => alert('Erro: ' + error)
        );
  }

  resetar(){
    // Reseta o formulário
    this.formulario.reset();
  }

  verificaValidTouched(campo: string){
    // this.formulario.controls(campo)
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  // Não funcionou corretamente devido a versão do Angular, na versão dois não possui a validação nativa para email, foi necessário substituir pelo pattern
  verificaEmailInvalido(){
    let campoEmail = this.formulario.get('email');
    if (campoEmail.errors){
      console.log(campoEmail);
      // return campoEmail.errors['email'] && campoEmail.touched;
      return campoEmail.errors['pattern'] && campoEmail.touched;
    }
  }

  aplicaCssErro(campo: string){
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
  }

}
