# Angular V2

## Aula 70 - Definindo Rota Padrão e Wildcard (Rota Não Encontrada)

No ecossistema do Angular Versão 2, o roteador (`@angular/router`) permite configurar rotas especiais para lidar com o comportamento padrão da aplicação (quando o usuário acessa a raiz `/`) e para capturar rotas inválidas ou inexistentes usando o curinga (Wildcard `**`), comumente utilizado para criar páginas de erro 404.

A ordem de declaração dessas rotas é estritamente importante, pois o roteador avalia as regras de cima para baixo.

Para exemplo prático neste projeto, foi criado o componente `pagina-nao-encontrada`.

```bash
# Comando Criação do Componente
ng g c pagina-nao-encontrada
```

```Text
# Saída Terminar Após Execução do Comando para Criação do Componente
  create src\app\pagina-nao-encontrada\pagina-nao-encontrada.component.scss
  create src\app\pagina-nao-encontrada\pagina-nao-encontrada.component.html
  create src\app\pagina-nao-encontrada\pagina-nao-encontrada.component.spec.ts
  create src\app\pagina-nao-encontrada\pagina-nao-encontrada.component.ts
  update src\app\app.module.ts
```

### Como Configurar Rota Padrão e Wildcard no Angular 2

Para implementar essas rotas, utilizamos propriedades específicas no objeto de rota: `redirectTo` com `pathMatch` para a rota padrão, e o caractere `**` para o wildcard.

### 1. Criando o Componente de Erro (404)

Crie um componente simples para exibir quando a página não for encontrada.

Crie o arquivo `nao-encontrado.component.ts`:

```TypeScript
import { Component } from '@angular/core';

@Component({
  selector: 'app-nao-encontrado',
  template: `
    <div style="text-align: center; margin-top: 50px;">
      <h2>Erro 404 - Página Não Encontrada</h2>
      <p>A rota que você tentou acessar não existe no sistema.</p>
      <a routerLink="/">Voltar para a Página Inicial</a>
    </div>
  `
})
export class NaoEncontradoComponent {}
```

### 2. Configurando as Rotas (`app.routing.ts`)

Aqui definimos:

Rota Padrão (`path: ''`): Utiliza `redirectTo` para redirecionar automaticamente para `/home` (ou outra rota principal) quando o usuário acessa a raiz da aplicação. O `pathMatch: 'full'` é obrigatório para caminhos vazios.

Rota Wildcard (`path: '**'`): Deve ser **sempre a última** do array, pois captura qualquer URL que não tenha dado match nas rotas anteriores.

Crie ou atualize o arquivo `app.routing.ts`:

```TypeScript
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { SobreComponent } from './sobre.component';
import { NaoEncontradoComponent } from './nao-encontrado.component';

const appRoutes: Routes = [
  // 1. Rota Padrão (Redirecionamento inicial)
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  
  // 2. Rotas normais da aplicação
  { path: 'home', component: HomeComponent },
  { path: 'sobre', component: SobreComponent },
  
  // 3. Rota Wildcard (DEVE SER A ÚLTIMA DO ARRAY)
  { path: '**', component: NaoEncontradoComponent }
];

export const routing = RouterModule.forRoot(appRoutes);
```

### 3. Registrando no Módulo Principal (`app.module.ts`)

Garanta que todos os componentes envolvidos estejam declarados no `NgModule`.

```TypeScript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { SobreComponent } from './sobre.component';
import { NaoEncontradoComponent } from './nao-encontrado.component';
import { routing } from './app.routing';

@NgModule({
  imports: [ BrowserModule, routing ],
  declarations: [ 
    AppComponent, 
    HomeComponent, 
    SobreComponent, 
    NaoEncontradoComponent 
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

### Pontos Cruciais a Observar:

- `pathMatch: 'full'`: Ao usar `redirectTo` com um caminho vazio (`''`), o Angular exige que você informe se a correspondência deve ser total (`full`) ou prefixada (`prefix`). Para a raiz, usa-se sempre `full`.
- **Ordem das Rotas**: Se você colocar o wildcard (`**`) no início ou no meio das rotas, ele vai capturar todas as requisições seguintes, impedindo que as páginas reais sejam abertas.

## Parâmetro `pathMatch`

O parâmetro `pathMatch` é uma das configurações mais importantes e que mais gera dúvidas no sistema de roteamento do Angular. Ele diz ao roteador como ele deve comparar a URL atual com o `path` definido na regra de rota ao decidir se deve ou não aplicar um redirecionamento (`redirectTo`).

No roteador do Angular, existem dois valores possíveis para o `pathMatch: 'prefix'` (que é o padrão) e `'full'`.

### 1. O modo `'prefix'` (Padrão)

Quando você define `pathMatch: 'prefix'` (ou omite o `pathMatch` em um redirecionamento), o roteador verifica se o `início da URL` corresponde ao valor do `path`.

- **Como funciona**: Se a URL atual começar com o texto do path, a regra de redirecionamento é disparada.
- **O perigo do caminho vazio (`''`)**: Como toda e qualquer URL começa com uma string vazia (`''`), se você usar `{ path: '', redirectTo: 'home', pathMatch: 'prefix' }`, o roteador vai interpretar que qualquer navegação (ex: `/sobre`, `/contato`, `/admin`) começa com `''` e vai redirecionar tudo para `/home`, gerando um loop infinito ou quebrando a aplicação.

### 2. O modo `'full'`

Quando você define `pathMatch: 'full'`, o roteador exige que a URL inteira corresponda exatamente ao `path` especificado.

- **Quando é obrigatório?** Sempre que o seu `path` for uma string vazia (`''`).
- **Por que?** Porque ele garante que o redirecionamento só vai acontecer se o usuário acessar exatamente a raiz da aplicação (ou seja, `/`), permitindo que URLs como `/home`, `/sobre` ou `/usuarios` passem livremente sem serem interceptadas pelo redirecionamento.