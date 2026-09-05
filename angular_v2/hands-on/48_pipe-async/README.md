# Angular V2

## Aula 48 - Pipes: Async

O `AsyncPipe` (`| async`) é um dos pipes nativos mais poderosos do Angular. Ele permite consumir dados assíncronos — como **Observables** (RxJS) e **Promises** — diretamente nos templates HTML, gerenciando automaticamente todo o ciclo de vida da inscrição.

### O que o `AsyncPipe` faz por baixo dos panos?

1. **Inscrição Automática**: Executa o `.subscribe()` no Observable ou aguarda a resolução da Promise assim que o componente é renderizado.
2. **Atualização da Interface**: Chama a detecção de mudanças (*Change Detection*) sempre que um novo valor é emitido.
3. **Cancelamento Automático (Unsubscribe)**: Executa o `.unsubscribe()` quando o componente é destruído (`ngOnDestroy`), evitando vazamentos de memória *(Memory Leaks*).

#### Exemplo Prático: Consumindo um Observable com `AsyncPipe`

No Componente TypeScript (`.ts`):

```TypeScript
import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-async-demo',
  templateUrl: './async-demo.component.html'
})
export class AsyncDemoComponent implements OnInit {
  // O sufixo '$' é uma convenção para indicar que a variável é um Observable
  contador$!: Observable<number>;
  usuario$!: Observable<{ nome: string; perfil: string }>;

  ngOnInit(): void {
    // Emite um número incremental a cada 1 segundo
    this.contador$ = interval(1000);

    // Simulação de busca de dados via serviço HTTP
    this.usuario$ = this.obterUsuario();
  }

  private obterUsuario(): Observable<{ nome: string; perfil: string }> {      
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({ nome: 'Ana Silva', perfil: 'Administradora' });
      }, 2000);
    });
  }
}
```

No Template HTML (`.html`):

```HTML
<!-- 1. Consumindo um contador numérico dinâmico -->
<h3>Contador: {{ contador$ | async }}</h3>

<!-- 2. Consumindo um objeto com guard de carregamento e aliasing (as) -->
<div *ngIf="usuario$ | async as usuario; else carregando">
  <p><strong>Nome:</strong> {{ usuario.nome }}</p>
  <p><strong>Perfil:</strong> {{ usuario.perfil }}</p>
</div>

<ng-template #carregando>
  <p>Carregando dados do usuário...</p>
</ng-template>
```

#### Sintaxe de Atribuição: as no *ngIf

Usar a sintaxe `*ngIf="stream$ | async as dados"` traz duas grandes vantagens:

- **Evita Múltiplas Inscrições**: Em vez de usar `(usuario$ | async)?.nome` e `(usuario$ | async)?.perfil` repetidamente no HTML (o que criaria múltiplos subscribes no mesmo Observable), o resultado é guardado em uma variável local (usuario).
- **Tratamento do Estado "Carregando"**: Permite alternar para um bloco `<ng-template>` enquanto o Observable não emite o primeiro valor.

#### Sem AsyncPipe vs. Com AsyncPipe

| Abordagem Manual (`.subscribe()`) | Abordagem com AsyncPipe (`\| async`) |
| :---| :--- |
| Requer guardar a Subscription em uma variável na classe | Não precisa criar variáveis de controle de inscrição |
| Requer implementar OnDestroy e chamar `.unsubscribe()` | Cancela a inscrição no DOM de forma 100% automática |
| Requer atribuir o valor emitido a uma propriedade local | O valor fica disponível diretamente no template |
| Propenso a vazamentos de memória por esquecimento do desenvolvedor | Totalmente seguro contra Memory Leaks |
