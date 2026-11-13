import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
    //   email: new FormControl(null),
    //   endereco: new FormGroup({
    //     cep: new FormControl(null),
    //     rua: new FormControl(null),
    //     numero: new FormControl(null),
    //     complemento: new FormControl(null),
    //     bairro: new FormControl(null),
    //     cidade: new FormControl(null),
    //     estado: new FormControl(null),
    //   })
    // });
      
    /* 2º Forma de Criar um Formulário */
    this.formulario = this.formBuilder.group({
      // nome: [ null, [ Validators.required, Validators.minLength(3), Validators.maxLength(200) ] ],
      nome: [ null, Validators.required ],
      //email: [ null, [ Validators.required, Validators.email ]] // Na versão 2, não possui o Validators.email, por isto a validação foi realizada através de uma expressão regular (pattern)
      email: [ null, [ Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?") ]],
      endereco: this.formBuilder.group({
        cep: [ null, Validators.required ],
        rua: [ null, Validators.required ],
        numero: [ null, Validators.required ],
        complemento: [ null ],
        bairro: [ null, Validators.required ],
        cidade: [ null, Validators.required ],
        estado: [ null, Validators.required ]
      })
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

  consultaCEP(){
    var cepControl = this.formulario.get('endereco.cep');
    var cep = cepControl ? cepControl.value : ''.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;
        //Valida o formato do CEP.
        if(validacep.test(cep)) {
          this.resetar();

          // this.http.get("https://viacep.com.br/ws/"+ cep +"/json"); Substituido pelo Template Literal, exemplo abaixo
          this.http.get(`https://viacep.com.br/ws/${cep}/json`)
            .map(dados => dados.json())
            // .subscribe(function(dados){});
            .subscribe(dados => this.popularDadosForm(dados));
        }
    }
  }

  popularDadosForm(dados: any){
    console.log();
    // 1. USANDO PATCHVALUE (Recomendado para preenchimentos parciais de API)
    this.formulario.patchValue({
      endereco: {
        cep: dados.cep,
        rua: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });

    /* 
      Nota sobre setValue():
      Se você quisesse usar o setValue(), seria obrigado a informar 
      TODOS os campos do grupo 'endereco', incluindo o próprio cep:

      this.formulario.setValue({
        endereco: {
          cep: cep, // obrigatório passar se não quiser que limpe
          rua: dados.logradouro,
          bairro: dados.bairro,
          cidade: dados.localidade,
          estado: dados.uf
        }
      });
    */

    /* Exemplo de setValue Exclusivo */
    this.formulario.get('endereco.numero').setValue('0');
  }

}
