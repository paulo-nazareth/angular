# Angular V2

## Aula 53 - Rotas: Definindo e Extraindo Parâmetros de Roteamento

```bash
# Componente Criado Para Exemplificar a Extração de Parâmetros no Roteamento
ng g c curso-detalhe
```

Para lidar com dados dinâmicos na URL — como exibições de detalhes de um item específico (`/produtos/15`) ou termos de busca (`/produtos?categoria=eletronicos`), o Angular disponibiliza a definição de parâmetros na configuração das rotas e o serviço `ActivatedRoute` para leitura e extração desses dados.

Types de Parâmetros de Roteamento

- **Parâmetros de Caminho (Path Parameters)**: Obrigatórios e definidos na própria estrutura da rota usando dois-pontos (`:id)`. Exemplo: `/produtos/15`.
- **Parâmetros de Consulta (Query Parameters)**: Opcionais, inseridos após o caractere `?` na URL. Exemplo: `/produtos?categoria=eletronicos`.

### 1. Definindo as Rotas com Parâmetros

No arquivo de rotas (`app-routing.module.ts`), declara-se o identificador do parâmetro precedido por dois-pontos (`:`).

```TypeScript
import { Routes } from '@angular/router';
import { ProdutoDetalheComponent } from './produto-detalhe/produto-detalhe.component';

export const routes: Routes = [
  // Parâmetro dinâmico chamado 'id'
  { path: 'produto/:id', component: ProdutoDetalheComponent }
];
```

### 2. Passando Parâmetros de Navegação

No Template HTML:

```HTML
<!-- Passando Parâmetro de Caminho (:id) -->
<a [routerLink]="['/produto', produto.id]">Ver Detalhes</a>

<!-- Passando Query Parameters (?categoria=eletronicos) -->
<a [routerLink]="['/produtos']" [queryParams]="{ categoria: 'eletronicos' }">
  Eletrônicos
</a>
```

No TypeScript (Navegação Programática):

```TypeScript
this.router.navigate(['/produto', produtoId]);
// Com Query Params:
this.router.navigate(['/produtos'], { queryParams: { categoria: 'eletronicos' } });
```

### 3. Extraindo os Parâmetros com ActivatedRoute

O serviço `ActivatedRoute` fornece o parâmetro de duas formas:

- `snapshot` (**Instantâneo**): Para quando a rota não muda de parâmetro reutilizando o mesmo componente.
- `params` / `paramMap` (Observable): Para quando a URL pode mudar de parâmetro enquanto o mesmo componente continua na tela (ex: navegar de `/produto/1` direto para `/produto/2`).

No Componente TypeScript (`.ts`):

```TypeScript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produto-detalhe',
  template: `
    <h3>ID do Produto: {{ idProduto }}</h3>
    <p>Categoria: {{ categoria }}</p>
  `
})
export class ProdutoDetalheComponent implements OnInit {
  idProduto!: string | null;
  categoria!: string | null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // -------------------------------------------------------------
    // Abordagem 1: Usando Snapshot (Leitura única na inicialização)
    // -------------------------------------------------------------
    this.idProduto = this.route.snapshot.paramMap.get('id');
    this.categoria = this.route.snapshot.queryParamMap.get('categoria');

    // -------------------------------------------------------------
    // Abordagem 2: Usando Observables (Reativo a mudanças na URL)
    // -------------------------------------------------------------
    // Captura mudanças no parâmetro de caminho (:id)
    this.route.paramMap.subscribe(params => {
      this.idProduto = params.get('id');
      // Lógica para carregar os dados do novo produto...
    });

    // Captura mudanças nos query parameters (?categoria=...)
    this.route.queryParamMap.subscribe(queryParams => {
      this.categoria = queryParams.get('categoria');
    });
  }
}
```

### Comparativo: `snapshot` vs `Observable`

| Estratégia | Quando utilizar? | Comportamento |
| :--- | :--- | :--- |
| `route.snapshot.paramMap` | O componente sempre é destruído ao recarregar a rota | Lê os parâmetros uma única vez no momento da instanciação. |
| `route.paramMap.subscribe()` | A URL muda de parâmetro, mas o Angular reutiliza a instância do componente | Dispara uma nova emissão a cada alteração da URL sem destruir o componente. |