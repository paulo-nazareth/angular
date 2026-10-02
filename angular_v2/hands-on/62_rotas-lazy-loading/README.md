# Angular V2

## Aula 62 - Rotas: Dica de Performance: Carregamento Sob Demanda (lazy loading)

O Carregamento Sob Demanda (Lazy Loading) é uma das melhores práticas de performance no Angular. Em vez de baixar o código de toda a aplicação (todos os módulos de funcionalidade) de uma só vez no primeiro acesso, o que aumenta o tempo de carregamento inicial (initial bundle size), o Lazy Loading faz com que o Angular baixe e compile o módulo somente quando o usuário navegar para a rota correspondente.

No ecossistema do Angular (especialmente nas versões iniciais como o v2), isso é feito combinando o sistema de rotas com a sintaxe de carregamento assíncrono de módulos.

### Como Implementar o Lazy Loading em Rotas

Para carregar um módulo sob demanda, você altera a forma como a rota aponta para ele no roteamento raiz (`app-routing.module.ts`), substituindo a importação estática por uma função de carregamento assíncrono.

### 1. Roteamento Raiz (`AppRoutingModule`)

Nas primeiras versões do Angular, utilizava-se a string de caminho complementada pelo # para indicar o caminho do arquivo seguido pelo nome da classe do módulo:

```TypeScript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // Rota padrão / redirecionamentos
  { path: '', redirectTo: 'alunos', pathMatch: 'full' },

  // Configuração de Lazy Loading para o AlunosModule
  { 
    path: 'alunos', 
    loadChildren: './alunos/alunos.module#AlunosModule' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

**Atenção à sintaxe**: O formato `'caminho/do/arquivo#NomeDoModulo'` diz ao compilador do Angular (e ao AOT/JIT) qual arquivo carregar e qual classe instanciar sob demanda.

### 2. O Módulo de Funcionalidade (`AlunosModule`)

Para que o Lazy Loading funcione perfeitamente, o módulo da funcionalidade deve ser completamente autônomo em relação às suas rotas filhas. Ele deve usar `RouterModule.forChild()`, conforme vimos anteriormente:

```TypeScript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunosRoutingModule } from './alunos-routing.module';
import { AlunosComponent } from './alunos.component';
import { AlunoDetalheComponent } from './aluno-detalhe.component';
import { AlunoFormComponent } from './aluno-form.component';

@NgModule({
  imports: [
    CommonModule,
    AlunosRoutingModule // Contém as rotas filhas mapeadas com forChild
  ],
  declarations: [
    AlunosComponent,
    AlunoDetalheComponent,
    AlunoFormComponent
  ]
})
export class AlunosModule { }
```

### Cuidados Importantes e Boas Práticas

- **Remova o módulo raiz do `AppModule`**: O módulo que é carregado via Lazy Loading nunca deve ser importado no array `imports` do seu `AppModule` principal. Se você importá-lo estaticamente lá, ele será incluído no pacote principal (main bundle), anulando o efeito do carregamento sob demanda.
- **Módulos Compartilhados (SharedModules)**: Se você tiver componentes, diretivas ou pipes reutilizáveis, coloque-os em um `SharedModule` e importe esse módulo compartilhado dentro do seu módulo de funcionalidade (`AlunosModule`).