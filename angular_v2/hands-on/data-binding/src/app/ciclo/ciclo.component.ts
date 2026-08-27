import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ciclo',
  templateUrl: './ciclo.component.html',
  styleUrls: ['./ciclo.component.css']
})
export class CicloComponent implements OnInit {

  @Input() valorInicial: number = 10;

  constructor() {
    this.log('Construtor');
  }

  ngOnInit() {
    this.log('ngOnInit');
  }

  ngDoCheck(){
    this.log('ngDoCheck');
  }

  ngOnChanges(){
    this.log('ngOnChanges');
  }
  
  ngAfterContentChecked(){
    this.log('ngAfterContentChecked');
  }
  
  ngAfterViewInit(){
    this.log('ngAfterViewInit');
  }
  
  ngAfterViewChecked(){
    this.log('ngAfterViewChecked');
  }
  
  ngOnDestroy(){
    this.log('ngOnDestroy');
  }

  private log(hook: string) {
    console.log(hook);
  }

}
