import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'contador', //Para fins didativo o selector app-output-properties, será renomeado para contador
  templateUrl: './output-properties.component.html',
  styleUrls: ['./output-properties.component.css']
  //, outputs: [ 'mudouValor' ]
})
export class OutputPropertiesComponent implements OnInit {

  @Input() valor: number = 0;

  @Output() mudouValor = new EventEmitter();

  incrementa(){
    this.valor++;
    this.mudouValor.emit({novoValor: this.valor});
  }
  
  decrementa(){
    this.valor--;
    this.mudouValor.emit({novoValor: this.valor});
  }

  constructor() { }

  ngOnInit() {
  }

}
