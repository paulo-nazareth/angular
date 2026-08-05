# Angular V2

## Aula 05 - Módulos (ngModule)

#### Criando módulo `CursosModule` para separação de features no nosso projeto.

Para criar o novo módulo execute o comando:

```bash
ng g m cursos
```

#### Criando um componente `CursosComponent`.

Para criar o novo componente execute o comando:

```bash
ng g c cursos
```

Para utilizar o selector do `app-cursos` do componente `CursosComponent`, dentro do `AppComponent`.
Quando o componente `CursosComponent`, pertence ao módulo `` (e o compomente só pode ser utilizado em um unico módulo). Importe o `CursosModule` no módulo `AppModule`.

#### Criando um segundo componente `CursoDetalheComponent`.

```bash
ng g c cursos/curso-detalhe
```

Nota: Se não exportamos o componente `CursoDetalheComponent`, ele fica restrito a visibilidade do módulo `CursosModule`, não sendo acessível fora dele, ou seja o `AppComponent`, não consegue acessar o seletor.

## NgModule

O NgModule é o bloco de construção fundamental do Angular (introduzido na versão 2.x e refinado na v4).

Para entender de forma simples: pense no NgModule como um contêiner organizador (ou uma caixa de ferramentas). Ele agrupa componentes, diretivas, pipes e serviços que pertencem à mesma funcionalidade do seu sistema.

### A Analogia do Módulo

Imagine que você está montando uma oficina de marcenaria:

- Os **Componentes** são os artesãos (que criam as peças visuais).
- As **Diretivas** e **Pipes** são as ferramentas manuais especiais (martelo, lixa).
- Os **Serviços** são os fornecedores de matéria-prima (que trazem madeira e pregos).

O `NgModule` é o **galpão da oficina**: ele define quem trabalha lá dentro, quais ferramentas eles podem usar, o que vem de fora e o que essa oficina pode vender para o mundo externo.

### A Estrutura de um `@NgModule`

No código TypeScript, um módulo é uma classe comum decorada com `@NgModule`. Essa anotação recebe um objeto de configuração com 4 metadados principais:

```TypeScript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MeuComponenteComponent } from './meu-componente/meu-componente.component';
import { MeuServicoService } from './meu-servico.service';

@NgModule({
  declarations: [
    AppComponent,
    MeuComponenteComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    MeuServicoService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
```

### Os 4 Pilares do @NgModule Explicados

**1. declarations (Declarações)**

"O que pertence a este módulo?"

Aqui você lista tudo o que cria visão ou altera o HTML:

- **Componentes** (AppComponent, HeaderComponent, etc.)
- **Diretivas** (ex: uma diretiva customizada para mascarar CPF)
- **Pipes** (ex: um pipe customizado para formatar moeda)

      **Regra de ouro**: Um componente/diretiva/pipe só pode ser declarado em UM ÚNICO módulo em toda a aplicação.

**2. imports (Importações)**

"O que este módulo precisa trazer de OUTROS módulos?"

Se os seus componentes declarados precisam usar recursos que foram criados em outro lugar, você precisa importar o módulo responsável por eles aqui.

Exemplos clássicos:

- `BrowserModule`: Necessário no módulo principal (AppModule) para que a aplicação rode no navegador.
- `FormsModule`: Se você for usar ngModel para formulários.
- `HttpModule`: Se for fazer requisições para APIs Backend.

**3. exports (Exportações)**

"O que este módulo torna PÚBLICO para outros módulos usarem?"

Por padrão, tudo o que está em declarations é privado do próprio módulo. Se você criar um módulo de funcionalidades (ex: UsuarioModule) e quiser que os componentes de outro módulo usem o <app-usuario-card>, você DEVE listar o UsuarioCardComponent dentro de `exports`.

4. providers (Provedores/Serviços)
"Quais serviços e regras de negócio estão disponíveis?"

Aqui você registra os Serviços (classes injetáveis que buscam dados, fazem login, etc.).
Quando você coloca um serviço nos providers de um módulo, o sistema de Injeção de Dependência do Angular cria uma instância desse serviço para ser compartilhada entre os componentes.

Extra: bootstrap (Inicialização)
"Qual componente dá o pontapé inicial na aplicação?"

Essa propriedade é usada apenas no módulo raiz (normalmente chamado de AppModule). Ela diz ao Angular qual componente deve ser renderizado primeiro na página index.html (geralmente o <app-root>).

Tipos de Módulos em uma Aplicação
Root Module (Módulo Raiz): O AppModule. É o ponto de entrada que o Angular carrega ao inicializar a aplicação.

Feature Modules (Módulos de Funcionalidade): Módulos criados para isolar partes do sistema (ex: ClienteModule, ProdutoModule, RelatoriosModule).

Shared Module (Módulo Compartilhado): Um módulo onde você coloca componentes reutilizáveis (botões customizados, modais) e exporta para o restante do sistema.

## 1. Padrões de Nomenclatura (Naming Conventions)

O Angular utiliza a convenção de nomes de arquivos baseados em funcionalidade e tipo, separando palavras por hífen (*kebab-case*).

### Arquivos e Diretores

- Nomes de arquivos: `kebab-case.tipo.ts`
  - Exemplo: `user-profile.component.ts`, `auth.service.ts`, `auth.guard.ts`, `user.model.ts`
- Nomes de pastas: `kebab-case`
  - Exemplo: `features/user-profile/`, `shared/components/button/`

### Classes, Interfaces e Enums

- Classes (`PascalCase`): Devem refletir o propósito + o sufixo do tipo.
  - Exemplo: `UserProfileComponent`, `AuthService`, `AuthGuard`
- Interfaces (`PascalCase`): Não utilize o prefixo I (ex: IUser é uma má prática).
  - Exemplo: User, ApiResponse, OrderDetails
- Types (`PascalCase`): Para tipos de união ou aliases.
  - Exemplo: `UserRole = 'admin' | 'user'`;
- Enums (`PascalCase` para o nome, `PascalCase` ou `UPPERCASE` para membros):
  - Exemplo:

```TypeScript
export enum OrderStatus {
  Pending = 'PENDING',
  Approved = 'APPROVED'
}
```

## 2. Nomenclatura de Variáveis e Propriedades

| Tipo de Elemento | Convenção | Exemplo |
| :--- | :--- | :--- |
| **Variáveis e Propriedades** | `camelCase` | `isLoading`, `userData`, `totalAmount` |
| **Constantes Globais** | `UPPER_SNAKE_CASE` | `MAX_RETRY_COUNT`, `API_URL` |
| **Booleans** | *Prefixos* `is`, `has`, `can`, `should` | `isLoggedIn`, `hasPermission` |
| **Observables (RxJS)** | *Sufixo* `$` *(Dollar Notation)* | `user$`, `orderList$` | 
| **Signals** | `camelCase` **(sem o sufixo $)** | `currentUser`, `isMobile` |
| **Eventos (@Output / output())** | *Verbo no presente/passado sem o prefixo `on`* | `select`, `change`, `userUpdated` |
| **Handlers de Eventos (Métodos)** | *Prefixo `on` ou verbo indicativo* | `onUserSelect()`, `handleSave()` |

## 3. Boas Práticas Atualizadas (Angular Moderno)

### Componentes Standalone (Padrão Atual)

Desde o Angular 14+, prefira componentes Standalone e evite criar NgModules desnecessários.

```TypeScript
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent { ... }
```

### Gestão de Estado com Signals

Utilize Signals em vez de variáveis comuns ou RxJS para estados locais reativos.

```TypeScript
export class CounterComponent {
  // Estado reativo
  count = signal(0);
  
  // Estado derivado (computed)
  doubleCount = computed(() => this.count() * 2);

  increment() {
    this.count.update(value => value + 1);
  }
}
```

### Injeção de Dependência com inject()

Substitua o construtor tradicional pela função inject(), facilitando a herança e o reuso de lógica.

```TypeScript
// Recomendado
export class UserProfileComponent {
  private userService = inject(UserService);
  private router = inject(Router);
}

// Em vez de:
// constructor(private userService: UserService, private router: Router) {}
```

### Insumos e Saídas Modernas (input() e output())

Prefira as novas APIs funcionais em vez dos decorators @Input() e @Output().

```TypeScript
export class UserCardComponent {
  // Input obrigatório e reativo
  userId = input.required<string>(); 

  // Output reativo
  profileClick = output<string>();

  onClick() {
    this.profileClick.emit(this.userId());
  }
}
```

### Controle de Fluxo Nativo no HTML

Substitua as diretivas estruturais antigas (*ngIf, *ngFor, *ngSwitch) pelo novo controle de fluxo nativo da versão 17+.

```HTML
<!-- Recomendado (Novo controle de fluxo) -->
@if (isLoggedIn()) {
  <app-user-dashboard />
} @else {
  <app-login-form />
}

@for (user of users(); track user.id) {
  <p>{{ user.name }}</p>
} @empty {
  <p>Nenhum usuário encontrado.</p>
}
```

### 4. Estrutura de Pastas Recomendada

Organize a aplicação por funcionalidades (Feature-based) e não por tipos de arquivo:

```plaintext
src/app/
├── core/                  # Serviços globais (Auth, Interceptors, Guards)
│   ├── guards/
│   └── interceptors/
├── shared/                # Componentes e pipes reutilizáveis em toda a app
│   ├── components/
│   └── pipes/
├── features/              # Módulos ou páginas da aplicação
│   ├── auth/
│   └── dashboard/
│       ├── components/    # Componentes exclusivos do dashboard
│       ├── services/      # Serviços exclusivos do dashboard
│       └── dashboard.component.ts
└── app.routes.ts          # Configuração de rotas
```

### 5. Resumo das Regras de Ouro

- **Imutabilidade**: Nunca altere objetos/arrays diretamente em um Signal. Use `.update()` ou `.set()` com cópias imutáveis.
- **Evite any**: Sempre tipagem explícita em TypeScript.
- **Inscrições RxJS (Unsubscribe)**: Ao usar RxJS, sempre limpe inscrições com takeUntilDestroyed() para evitar vazamentos de memória (*memory leaks*).
- **Pipe async ou Signals no Template**: Nunca faça `.subscribe()` no componente para popular variáveis globais que vão para o HTML; use a reatividade nativa.