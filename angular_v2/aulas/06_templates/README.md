# Angular V2

## Aula 06 - Templates

No Angular, o Template é a parte visual do componente, ou seja, é o código HTML que define o que o usuário vai ver na tela.

No entanto, o template do Angular vai além do HTML tradicional: ele é uma interface reativa e dinâmica. Através do template, você consegue exibir dados da sua classe TypeScript, reagir a eventos do usuário (como cliques e digitações) e alterar a estrutura da página em tempo real.

## 1. As Duas Formas de Declarar um Template

Você pode associar um template ao seu componente de duas maneiras:

#### A) Template Externo (Mais comum)

O HTML fica em um arquivo separado (.html). É a melhor escolha para telas médias e complexas.

```TypeScript
@Component({
  selector: 'app-saudacao',
  standalone: true,
  templateUrl: './saudacao.component.html', // Caminho para o arquivo HTML
  styleUrl: './saudacao.component.scss'
})
export class SaudacaoComponent {
  nome = 'Maria';
}
```

#### B) Template Inline (Template Literal)

O HTML é escrito diretamente dentro do arquivo do componente (`.ts`) usando backticks (``). Ideal para componentes muito simples ou pequenos.
Recomendado para utilização quando o HTML se restingir a no máximo 3 linhas.

```TypeScript
@Component({
  selector: 'app-saudacao',
  standalone: true,
  template: `
    <h1>Olá, {{ nome }}!</h1>
    <p>Bem-vindo ao sistema.</p>
  `
})
export class SaudacaoComponent {
  nome = 'Maria';
}
```

## 2. Como Utilizar: As 4 Sintaxes Principais

A magia do template acontece na forma como ele se comunica com a classe TypeScript do componente. Existem 4 formas principais de fazer essa integração:

### 1. Interpolação {{ valor }}

Exibe dados da classe TypeScript diretamente no HTML.

- TypeScript:

```TypeScript
export class PerfilComponent {
  usuario = 'Carlos';
  idade = 28;
}
```

- Template (HTML):

```HTML
<h2>Usuário: {{ usuario }}</h2>
<p>Idade: {{ idade }} anos</p>
<p>Ano de nascimento: {{ 2026 - idade }}</p> <!-- Aceita expressões simples -->
```

### 2. Property Binding [propriedade]="valor"

Associa uma propriedade de um elemento HTML (como `src`, `disabled`, `href`, `value`) a uma variável do TypeScript.

- TypeScript:

```TypeScript
export class BotaoComponent {
  urlImagem = 'assets/avatar.png';
  isDesabilitado = true;
}
```

- Template (HTML):

```HTML
<img [src]="urlImagem" alt="Foto do perfil">
<button [disabled]="isDesabilitado">Enviar</button>
```

### 3. Event Binding (evento)="metodo()"

Escuta eventos do usuário (como `click`, `keyup`, `submit`) e dispara um método na classe TypeScript.

- TypeScript:

```TypeScript
export class ContadorComponent {
  contador = 0;

  incrementar() {
    this.contador++;
  }
}
```

- Template (HTML):

```HTML
<p>Total: {{ contador }}</p>
<button (click)="incrementar()">Somar +1</button>
```

### 4. Two-Way Data Binding [(ngModel)]="variavel"

Sincronização em tempo real nas duas direções: se o usuário digita no campo de texto, a variável no TypeScript atualiza. Se a variável muda no código, o campo de texto na tela atualiza.

(Nota: Requer a importação do FormsModule no componente).

- TypeScript:

```TypeScript
export class BuscaComponent {
  termoBusca = '';
}
```

- Template (HTML):

```HTML
<input [(ngModel)]="termoBusca" placeholder="Digite sua busca...">
<p>Você está buscando por: {{ termoBusca }}</p>
```

## 3. Lógica e Controle de Fluxo no Template

Nas versões modernas do Angular, você pode controlar o que aparece na tela de forma nativa e muito legível usando `@if`, `@for` e `@switch`.

Condicional (`@if`)

```HTML
@if (isLogado) {
  <button (click)="logout()">Sair</button>
} @else {
  <button (click)="login()">Entrar</button>
}
```

Repetição (`@for`)

```HTML
<ul>
  @for (item of listaDeProdutos; track item.id) {
    <li>{{ item.nome }} - R$ {{ item.preco }}</li>
  } @empty {
    <li>Nenhum produto cadastrado.</li>
  }
</ul>
```

## 4. O que é o `<ng-template>`?

Além do template principal do componente, existe a tag <ng-template>. Ela serve para criar um bloco de HTML que não é renderizado imediatamente, mas sim sob demanda ou reusado em partes específicas da tela.

Exemplo de uso prático:

```HTML
@if (carregando) {
  <p>Carregando dados...</p>
} @else {
  <!-- Renderiza o bloco de dados caso não esteja carregando -->
  <ng-container *ngTemplateOutlet="conteudoPrincipal"></ng-container>
}

<!-- Este pedaço de HTML fica "invisível" até ser chamado -->
<ng-template #conteudoPrincipal>
  <div>
    <h2>Bem-vindo ao Painel!</h2>
    <p>Aqui estão suas estatísticas...</p>
  </div>
</ng-template>
```

### Resumo dos Pontos-Chave

O Template é a view (HTML) do seu componente.

- Use {{ }} para mostrar texto.
- Use [ ] para enviar dados para propriedades HTML.
- Use ( ) para escutar eventos do usuário.
- Use @if e @for para criar telas dinâmicas com condições e listas.