import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent implements OnInit {

  url: string = 'www.site.com.br';
  cursoAngular: boolean = true;
  urlImagem: string = 'https://picsum.photos/id/237/200/300';
  textEvent: string = '';
  inputSalvo: string = '';
  isMouseOver: boolean = false;

  getValor(){
    return 1;
  }

  getCurtirCurso(){
    return true;
  }

  clicado(){
    alert('Botão Clicado!');
  }

  onKeyUp(evento: KeyboardEvent){
    this.textEvent = (<HTMLInputElement>evento.target).value;
  }

  salvarValor(valor: string){
    this.inputSalvo = valor;
  }

  onMouseOverOut(){
    this.isMouseOver = !this.isMouseOver;
  }

  constructor() { }

  ngOnInit() {
  }

}
