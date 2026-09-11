# Angular V2

## Aula 55 - Rotas Imperativas: Redirecionamento via Código

A navegação imperativa (feita diretamente via código TypeScript) e o redirecionamento programático são essenciais para cenários onde a mudança de rota depende de uma lógica de negócio — como após o processamento de um formulário, envio de dados para uma API ou validação de autenticação.

No Angular, essa navegação é gerenciada através dos serviços `Router` e `Location`.

Para exemplificação desta aula será criado um novo serviço:

```bash
# Criação do Serviço Curso
ng g s cursos/cursos

# Criação do Componente CursoNaoEncontrado
ng g c curso-nao-encontrado
```

### 1. Injetando o Serviço `Router`

Para navegar via TypeScript, injeta-se o serviço `Router` no construtor do componente ou serviço.

```TypeScript
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `<button (click)="executarLogin()">Entrar no Sistema</button>`
})
export class LoginComponent {

  constructor(private router: Router) {}

  executarLogin(): void {
    // Exemplo de regra de negócio antes da navegação
    const sucesso = true;

    if (sucesso) {
      // Navegação imperativa básica
      this.router.navigate(['/dashboard']);
    }
  }
}
```

### 2. Métodos Principais do Router

O Angular disponibiliza duas formas principais para disparar a navegação programática:

#### `navigate()`

Recebe um array de segmentos de rota (útil para passar parâmetros).

```TypeScript
// Rota simples: '/produtos'
this.router.navigate(['/produtos']);

// Rota com parâmetro de caminho: '/produtos/15'
this.router.navigate(['/produtos', 15]);

// Rota com Query Parameters e Fragmento: '/produtos/15?categoria=eletronicos#detalhes'
this.router.navigate(['/produtos', 15], {
  queryParams: { categoria: 'eletronicos' },
  fragment: 'detalhes'
});
```

#### `navigateByUrl()`

Recebe uma string com o caminho absoluto completo da URL. É mais rápido que o `navigate()` pois não precisa processar o array de segmentos.

```TypeScript
// Navegação direta com string de URL
this.router.navigateByUrl('/dashboard');

// Aceita query params diretamente formatados na string
this.router.navigateByUrl('/produtos?categoria=eletronicos');
```

### 3. Opções Avançadas de Navegação (`NavigationExtras`)

O segundo argumento do método `navigate()` ou `navigateByUrl() `permite controlar o comportamento da navegação:

```TypeScript
this.router.navigate(['/dashboard'], {
  // 1. Substitui o item atual no histórico do navegador (evita que o botão 'Voltar' retorne a esta tela)
  replaceUrl: true,

  // 2. Mantém os query params existentes ao navegar para uma nova rota
  queryParamsHandling: 'preserve', // Opções: 'merge' | 'preserve' | ''

  // 3. Passa objetos/dados complexos sem expor na URL
  state: { informacaoSensivel: 'token-123', usuario: 'Admin' }
});
```

Como ler o `state` no componente de destino:

```TypeScript
export class DashboardComponent {
  dadosRecebidos: any;

  constructor(private router: Router) {
    // O state só pode ser lido dentro do construtor
    const navegacao = this.router.getCurrentNavigation();
    this.dadosRecebidos = navegacao?.extras.state;
  }
}
```

### 4. Voltando ou Avançando na História (Location)

Se a necessidade for apenas simular o botão "Voltar" ou "Avançar" do navegador do usuário, utiliza-se o serviço `Location` do pacote `@angular/common`:

```TypeScript
import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-voltar',
  template: `<button (click)="voltarPagina()">Voltar</button>`
})
export class VoltarComponent {

  constructor(private location: Location) {}

  voltarPagina(): void {
    // Retorna para a página anterior no histórico do navegador
    this.location.back();
  }

  avancarPagina(): void {
    // Avança para a próxima página no histórico
    this.location.forward();
  }
}
```


