# Angular V2

## Aula 40 - Escopo de instâncias de serviços e módulos (singleton e varias instâncias)

No Angular, o escopo e a quantidade de instâncias de um serviço (Singleton vs. Múltiplas Instâncias) dependem diretamente de onde e como o serviço é provido na árvore de injetores (Injector Tree).

### 1. Padrão Singleton (Instância Única Global)

Em um cenário Singleton, o Angular cria apenas uma única instância do serviço para toda a aplicação. Todas as classes que injetarem esse serviço compartilharão exatamente o mesmo objeto e o mesmo estado.

### Como configurar:

- **Abordagem Moderna (Recomendada)**: Usando `providedIn: 'root'` no decorador `@Injectable()`.
- **Abordagem Tradicional**: Registrando no array `providers` do `@NgModule` principal (geralmente o `AppModule`).

```TypeScript
@Injectable({
  providedIn: 'root' // Garante uma única instância Singleton em toda a aplicação
})
export class CarrinhoService {
  public itens: string[] = [];
}
```

### 2. Múltiplas Instâncias (Escopo por Componente)

Se você registrar um serviço no array `providers` da métrica `@Component`, o Angular criará uma nova instância exclusiva desse serviço para cada ocorrência daquele componente no DOM (e para todos os seus componentes filhos).

```TypeScript
@Component({
  selector: 'app-editor',
  template: `...`,
  providers: [RascunhoService] // Nova instância criada para CADA <app-editor> no DOM
})
export class EditorComponent {
  // Este serviço terá um estado isolado para este componente
  constructor(private rascunhoService: RascunhoService) {}
}
```

### 3. Serviços em Módulos e Módulos com Carregamento Tardio (Lazy Loading)

O comportamento do escopo varia bastante de acordo com a forma como os módulos do Angular (`@NgModule`) são carregados:

- Módulos Eager (Carregados no início): Se um serviço for provido dentro de um módulo importado no início da aplicação (como no `AppModule`), ele se torna global (**Singleton**) para toda a aplicação.
- Módulos Lazy Loaded (Carregados sob demanda): Quando um módulo é carregado via **Lazy Loading**, o Angular cria um **Child Injector (Injetor Filho)** exclusivo para essa rota. Qualquer serviço registrado no array `providers` deste módulo terá uma nova instância isolada apenas para as rotas desse módulo.

### Resumo Comparativo de Escopos

| Onde o serviço é registrado | Quem compartilha a mesma instância? | Padrão |
| :--- | :--- | :--- |
| `@Injectable({ providedIn: 'root' })` | Toda a aplicação | Singleton Global |
| `providers: [MeuService]` no `AppModule` | Toda a aplicação | Singleton Global |
| `providers: [MeuService]` em **Módulo Lazy Loaded** | Apenas os componentes e rotas daquele Módulo Lazy | Instância Única do Módulo |
| `providers: [MeuService]` no `@Component` | O componente hospedeiro e seus componentes filhos | Instância por Componente |

Para exemplificação foi criado o componente `criar-curso` no projeto de `servicos`.

```bash
ng g c criar-curso
```

Nota: Após a declaração do serviço ser realizado em dois componentes, o construtor do serviço é chamado uma unica vez, pos esta declarado nos providers do `app.module.ts`.
Mas se declaramos no `providers` de cada módulo individualmente o serviço será acionado o número de vezes que for instanciado.

### Curiosidade 

Módulo de funcionalidade sem ser o módulo raiz passa a utilizar o CommonModule no lugar do BrowserModule.