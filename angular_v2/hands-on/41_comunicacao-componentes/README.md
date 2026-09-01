# Angular V2

## Aula 41 - Comunicação Entre Componentes Usando Serviços (broadcast e eventos)

Serviços compartilhados que atuam como Singletons funcionam como um canal centralizado (baseado no padrão Pub-Sub ou Mediator) para permitir a comunicação entre componentes que não possuem uma relação direta de hierarquia (pai e filho).

#### O Papel do RxJS (`Subject` e `BehaviorSubject`)

Para transmitir dados e eventos entre componentes através de um serviço, utiliza-se a biblioteca RxJS. O mecanismo principal é o `Subject` (ou `BehaviorSubject`), que age simultaneamente como um observável (Observable) e como um observador (Observer), permitindo emitir novos valores e escutá-los em diferentes pontos da aplicação.

- `Subject`: Emite novos eventos apenas para os componentes que se inscreveram após a emissão.
- `BehaviorSubject`: Mantém armazenado o último valor emitido, entregando-o imediatamente a qualquer novo componente que se inscreva no canal.

#### Exemplo Prático de Comunicação

#### 1. Criando o Serviço de Mensagens (`mensagem.service.ts`)

O serviço encapsula o `Subject` e expõe apenas um `Observable` público para garantir que os componentes apenas escutem ou emitam dados de forma controlada.

```TypeScript
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {
  // Criação do canal de transmissão privado
  private fonteMensagem = new Subject<string>();

  // Exposição pública apenas como Observable
  mensagem$ = this.fonteMensagem.asObservable();

  // Método disparador do evento
  enviarMensagem(texto: string): void {
    this.fonteMensagem.next(texto);
  }
}
```

#### 2. Componente Emissor (Dispara o Evento)

```TypeScript
import { Component } from '@angular/core';
import { MensagemService } from './mensagem.service';

@Component({
  selector: 'app-emissor',
  template: `
    <button (click)="notificar()">Enviar Notificação</button>
  `
})
export class EmissorComponent {
  constructor(private mensagemService: MensagemService) {}

  notificar() {
    this.mensagemService.enviarMensagem('Dados atualizados com sucesso!');
  }
}
```

#### 3. Componente Receptor (Escuta o Evento)

```TypeScript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MensagemService } from './mensagem.service';

@Component({
  selector: 'app-receptor',
  template: `
    <p>Última mensagem recebida: {{ mensagemRecebida }}</p>
  `
})
export class ReceptorComponent implements OnInit, OnDestroy {
  mensagemRecebida: string = 'Nenhuma mensagem ainda.';
  private inscricao!: Subscription;

  constructor(private mensagemService: MensagemService) {}

  ngOnInit(): void {
    // Inscreve-se no fluxo de dados do serviço
    this.inscricao = this.mensagemService.mensagem$.subscribe(
      (msg) => {
        this.mensagemRecebida = msg;
      }
    );
  }

  ngOnDestroy(): void {
    // Essencial para evitar vazamento de memória (Memory Leak)
    this.inscricao.unsubscribe();
  }
}
```

### Boas Práticas no Uso de Serviços para Eventos

- **Gerenciamento de Inscrições**: Sempre cancele a assinatura (*unsubscribe*) no método `ngOnDestroy()` do componente receptor caso o serviço não seja um Singleton vitalício, evitando consumo desnecessário de memória.
- **Alternativa com Async Pipe**: No template HTML, você pode usar o pipe `async ({{ mensagemService.mensagem$ | async }})` para gerenciar a inscrição e o cancelamento de forma automática.

Separação de Responsabilidades: Evite misturar regras de negócio complexas com o roteamento de eventos. Prefira manter os Subjects dedicados a notificações pontuais ou gerenciamento de estado leve.

### Caso Exemplificado com EventEmitter

Apesar de ser tecnicamente possível declarar um `EventEmitter` dentro de um Serviço no Angular, essa prática é fortemente desaconselhada.

A classe `EventEmitter` do Angular foi projetada exclusivamente para funcionar em conjunto com o decorador `@Output()` para comunicação direta de filho para pai. Quando o objetivo é compartilhar eventos ou dados entre componentes desacoplados usando Serviços, o padrão recomendado pela equipe do Angular e pela comunidade é o uso de RxJS (`Subject` ou `BehaviorSubject`).

Por que NÃO usar `EventEmitter` em Serviços?

Propósito Errado: A própria documentação do Angular e a implementação da classe estendem a interface do RxJS `Subject`, mas adicionam comportamentos específicos para o ciclo de vida dos componentes DOM e para a diretiva `@Output()`.

Vazamentos de Memória e Assincronismo: O `EventEmitter` pode apresentar comportamentos síncronos indesejados fora da árvore de componentes e não oferece métodos avançados de manipulação de fluxo (como os operadores `map`, `filter`, `debounceTime`, etc.).

Para exemplificação foi criado um novo componente chamado `receber-curso-criado`, no projeto `servicos`, para exemplificar também o escopo, desenvolvendo uma comunicação entre o componente ``

```bash
ng g c receber-curso-criado
```