import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: 'paulo',
    email: 'paulo@email.com'
  }

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    console.log(form);
    console.log(form.value);
    console.log(this.usuario);
  }

  // Regex definida como objeto nativo do JS (evita o erro de compilação do HTML)
  emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*$/;
}
