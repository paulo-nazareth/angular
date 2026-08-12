import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'contador', //Para fins didativo o selector app-output-properties, será renomeado para contador
  templateUrl: './output-properties.component.html',
  styleUrls: ['./output-properties.component.css']
  //, outputs: [ 'mudouValor' ]
})
export class OutputPropertiesComponent implements OnInit {

  @Input() valor: number = 0;

  @Output() mudouValor = new EventEmitter();

  //Nome do cammpo no HTML -> campoImput (Referencia)
  @ViewChild('campoInput') campoValorInput: ElementRef;

  incrementa() {
    //this.valor++;
    this.campoValorInput.nativeElement.value++;
    this.mudouValor.emit({novoValor: this.valor});
  }
  
  decrementa() {
    //this.valor--;
    this.campoValorInput.nativeElement.value--;
    this.mudouValor.emit({novoValor: this.valor});
  }

  constructor() { }

  ngOnInit() {
  }

}
