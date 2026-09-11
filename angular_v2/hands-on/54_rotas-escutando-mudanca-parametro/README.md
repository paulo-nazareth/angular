# Angular V2

## Aula 54 - Rotas: Escutando Mudanças nos Parâmetros de Roteamento

O `BehaviorSubject` é um tipo especial de Subject da biblioteca RxJS que mantém e emite o último valor armazenado para qualquer novo assinante (subscriber). Ele é amplamente utilizado no Angular para gerenciamento de estado local e comunicação reativa entre componentes e serviços.

### A Diferença Fundamental: `Subject` vs. `BehaviorSubject`

- `Subject` **(Padrão)**: Não guarda histórico. Se um componente se inscrever depois que uma informação foi emitida, ele perderá o dado até que uma nova emissão ocorra.
- `BehaviorSubject`: Exige um valor inicial na sua instanciação e guarda sempre o valor mais recente na memória. No momento em que um novo componente faz o `.subscribe()`, ele recebe imediatamente o último valor emitido.

### Como Usar o `BehaviorSubject` em um Serviço Angular

A melhor prática no Angular é manter o BehaviorSubject como privado dentro do serviço (para evitar alterações externas diretas) e expor apenas a sua versão como Observable público.

#### 1. Definindo o Serviço (`usuario.service.ts`)

```TypeScript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Usuario {
  nome: string;
  autenticado: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // 1. Inicializado obrigatoriamente com o valor inicial
  private usuarioSubject = new BehaviorSubject<Usuario>({
    nome: 'Visitante',
    autenticado: false
  });

  // 2. Exposição como Observable (somente leitura para componentes)
  public usuario$: Observable<Usuario> = this.usuarioSubject.asObservable();

  // 3. Atualização do estado do Subject
  atualizarUsuario(novoNome: string): void {
    this.usuarioSubject.next({
      nome: novoNome,
      autenticado: true
    });
  }

  // 4. Acesso síncrono ao valor atual
  obterUsuarioAtual(): Usuario {
    return this.usuarioSubject.getValue();
  }
}
```

### Consumindo nos Componentes

Como o `BehaviorSubject` guarda o último valor emitido, componentes que são renderizados mais tarde (como telas abertas após o carregamento inicial) leem o estado correto no exato segundo em que se inscrevem.

No Componente TypeScript:

```TypeScript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuarioService, Usuario } from './usuario.service';

@Component({
  selector: 'app-perfil',
  template: `
    <p>Usuário logado: {{ usuario.nome }}</p>
    <button (click)="alterarNome()">Mudar Nome</button>
  `
})
export class PerfilComponent implements OnInit, OnDestroy {
  usuario!: Usuario;
  private sub!: Subscription;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    // Inscreve-se e recebe IMEDIATAMENTE o valor atual armazenado
    this.sub = this.usuarioService.usuario$.subscribe(dados => {
      this.usuario = dados;
    });
  }

  alterarNome(): void {
    this.usuarioService.atualizarUsuario('Ana Souza');
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
```

### Principais Vantagens no Angular

- **Sincronização de Estado**: Perfeito para compartilhar dados globais dinâmicos, como informações do usuário logado, itens no carrinho de compras ou tema visual (claro/escuro).
- **Consumo com** `AsyncPipe`: Integra-se com o pipe `| async` no HTML, reduzindo a necessidade de subscrições manuais.
- **Leitura Síncrona** (`.getValue()`): Permite ler o estado atual instantaneamente dentro do código sem ter que executar um `.subscribe()`.