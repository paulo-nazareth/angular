# Angular V2

## Aula 56 - Rotas: Definindo e Extraindo Parâmetros de URL (query)

Os Query Parameters (parâmetros de consulta) são valores opcionais passados na URL após o símbolo de interrogação (`?`), separados pelo caractere `&`. Ao contrário dos parâmetros de caminho (*path params*), eles não precisam ser declarados na tabela de rotas (`Routes`), sendo ideais para filtros, paginações, termos de busca e ordenação.

Exemplo de URL:

https://meusite.com/produtos?categoria=eletronicos&pagina=2

### 1. Definindo a Rota Base

Na tabela de rotas (`app-routing.module.ts`), configure a rota sem especificar os Query Parameters:

```TypeScript
import { Routes } from '@angular/router';
import { ProdutosComponent } from './produtos/produtos.component';

export const routes: Routes = [
  // Apenas o caminho base é necessário
  { path: 'produtos', component: ProdutosComponent }
];
```

### 2. Passando Query Parameters na Navegação

Você pode anexar Query Parameters tanto declarativamente pelo HTML quanto programaticamente via TypeScript.

#### A. Pelo Template HTML (`[queryParams]`)

Use a diretiva `queryParams` em conjunto com o routerLink:

```HTML
<!-- Gera a URL: /produtos?categoria=eletronicos&ordenar=preco -->
<a [routerLink]="['/produtos']" 
   [queryParams]="{ categoria: 'eletronicos', ordenar: 'preco' }">
  Ver Eletrônicos
</a>
```

#### B. Pelo TypeScript (`Router.navigate`)

Passe o objeto `queryParams` dentro do objeto de configuração do método `navigate()`:

```TypeScript
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filtro',
  template: `<button (click)="aplicarFiltro()">Filtrar</button>`
})
export class FiltroComponent {

  constructor(private router: Router) {}

  aplicarFiltro(): void {
    this.router.navigate(['/produtos'], {
      queryParams: { 
        categoria: 'eletronicos', 
        pagina: 1 
      }
    });
  }
}
```

### 3. Extraindo os Query Parameters (`ActivatedRoute`)

A leitura dos parâmetros na tela de destino é feita com o serviço `ActivatedRoute`. Dependendo do caso de uso, você pode optar pela leitura pontual (`snapshot`) ou reativa (`queryParamMap` / `queryParams`).

#### A. Abordagem Reativa (Recomendada)

Se o usuário puder alterar os filtros na mesma tela (por exemplo, trocar a página de 1 para 2 sem recarregar o componente), escute as mudanças usando o `Observable` `queryParamMap`:

```TypeScript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-produtos',
  template: `
    <h3>Produtos</h3>
    <p>Categoria ativa: {{ categoria }}</p>
    <p>Página: {{ pagina }}</p>
  `
})
export class ProdutosComponent implements OnInit, OnDestroy {
  categoria: string | null = null;
  pagina: number = 1;
  private sub!: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Inscreve-se nas alterações dos Query Params da URL
    this.sub = this.route.queryParamMap.subscribe(params => {
      this.categoria = params.get('categoria'); // Retorna o valor ou null
      this.pagina = Number(params.get('pagina')) || 1;

      // Execute aqui a busca de dados na API com os novos filtros
      this.carregarProdutos(this.categoria, this.pagina);
    });
  }

  carregarProdutos(categoria: string | null, pagina: number): void {
    // Lógica para chamar o serviço backend
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
```

#### B. Abordagem Instantânea (`snapshot`)

Utilize `snapshot` se você tem certeza de que os parâmetros só serão lidos uma vez na inicialização do componente:

```TypeScript
ngOnInit(): void {
  // Leitura única no momento do carregamento
  this.categoria = this.route.snapshot.queryParamMap.get('categoria');
  this.pagina = Number(this.route.snapshot.queryParamMap.get('pagina')) || 1;
}
```

### 4. Preservando ou Mesclando Query Parameters na Navegação

Se você navegar para outra rota e quiser manter os Query Parameters já presentes na URL, utilize a opção `queryParamsHandling`:

```TypeScript
// 1. 'preserve': Mantém os query params atuais intactos ao navegar
this.router.navigate(['/detalhes'], { 
  queryParamsHandling: 'preserve' 
});

// 2. 'merge': Mantém os query params atuais e adiciona/sobrescreve novos
this.router.navigate([], {
  relativeTo: this.route,
  queryParams: { ordenacao: 'asc' }, // Adiciona 'ordenacao' mantendo 'categoria' e 'pagina'
  queryParamsHandling: 'merge'
});
```