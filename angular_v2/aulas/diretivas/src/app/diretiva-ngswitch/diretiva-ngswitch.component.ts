import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diretiva-ngswitch',
  templateUrl: './diretiva-ngswitch.component.html',
  styleUrls: ['./diretiva-ngswitch.component.scss']
})
export class DiretivaNgswitchComponent implements OnInit {

  abaSelecionada: string = 'home'; // 'home', 'perfil', 'configuracoes'

  definirAba(aba: string) {
    this.abaSelecionada = aba;
  }

  constructor() { }

  ngOnInit() {
  }

}
