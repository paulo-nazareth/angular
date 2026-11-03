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
}
