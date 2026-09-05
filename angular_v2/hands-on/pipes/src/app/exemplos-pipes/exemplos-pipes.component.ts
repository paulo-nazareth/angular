import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-exemplos-pipes',
  templateUrl: './exemplos-pipes.component.html',
  styleUrls: ['./exemplos-pipes.component.scss']
})
export class ExemplosPipesComponent implements OnInit {

  livro: any = {
    titulo: 'Learning JavaScript Data Struture and Algorithms',
    rating: 4.54321,
    numeroPaginas: 314,
    preco: 44.99,
    dataLancamento: new Date(2016, 5, 23),
    url: 'https://www.google.com.br'
  }

  livros: string[] = ['Java', 'Angular 2'];

  filtro: string = '';
  
  addCurso(valor: string){
    this.livros.push(valor);
  }

  obterCursos(){
    if(this.livros.length === 0 || this.filtro === undefined || this.filtro.trim() === ''){
      return this.livros;
    }    
    return this.livros.filter(
      (v: any) => {
        if(v.toLocaleLowerCase().indexOf(this.filtro.toLowerCase()) >= 0){
          return true;
        }
        return false;
      } 
    );
  }

  valorAsync = new Promise(
    (resolve, reject) => {
      setTimeout(() => resolve('Valor Assíncrono'), 2000)
    }
  );

  valorAsync2 = Observable.interval(2000)
    .map(valor => 'Valor Assíncrono 2');

  constructor() { }

  ngOnInit() {
  }

}
