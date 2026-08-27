# Angular V2

## Aula 38 - Criando um Serviço (Service)

Para exemplificação foi criado um novo componente chamado `cursos` no projeto `servicos`.

```bash
# Criação da Diretiva
ng g c cursos
```

### Criando um Serviço Básico

```TypeScript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Singleton disponível em toda a aplicação
})
export class TarefaService {
  private tarefas: string[] = ['Aprender Angular', 'Estudar Services'];

  getTarefas(): string[] {
    return [...this.tarefas];
  }

  adicionarTarefa(novaTarefa: string): void {
    if (novaTarefa.trim()) {
      this.tarefas.push(novaTarefa);
    }
  }
}
```

#### Injetando e Utilizando o Serviço em um Componente

```TypeScript
import { Component, OnInit } from '@angular/core';
import { TarefaService } from './tarefa.service';

@Component({
  selector: 'app-lista-tarefas',
  template: `
    <h3>Minhas Tarefas</h3>
    <ul>
      <li *ngFor="let t of lista">{{ t }}</li>
    </ul>
    <button (click)="add()">Nova Tarefa</button>
  `
})
export class ListaTarefasComponent implements OnInit {
  lista: string[] = [];

  // O Angular injeta automaticamente a instância do serviço
  constructor(private tarefaService: TarefaService) {}

  ngOnInit(): void {
    this.lista = this.tarefaService.getTarefas();
  }

  add(): void {
    this.tarefaService.adicionarTarefa('Aprender RXJS');
    this.lista = this.tarefaService.getTarefas();
  }
}
```