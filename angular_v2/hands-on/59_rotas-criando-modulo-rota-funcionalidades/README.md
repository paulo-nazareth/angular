# Angular V2

## Aula 59 - Rotas: Criando um Módulo de Rotas de Funcionalidade

Organizar as rotas de uma aplicação Angular, especialmente em versões iniciais como o Angular v2, em **Módulos de Rotas de Funcionalidade** (*Feature Routing Modules*) é uma excelente prática para manter o código limpo, modular e preparado para escalabilidade ou lazy loading.

A separação das rotas de uma funcionalidade específica evita que o arquivo principal de roteamento (`AppRoutingModule`) fique sobrecarregado.

### Passo a Passo para Criar um Módulo de Rotas de Funcionalidade

Para implementar um módulo de rotas dedicado a uma funcionalidade (por exemplo, um módulo chamado `Client`), siga a estrutura abaixo:

### 1. Definindo o Array de Rotas

Crie um arquivo para as rotas da sua feature (ex: `client.routing.ts` ou `client-routing.module.ts`). Nele, você define as rotas específicas daquele contexto usando o tipo `Routes`.

### 2. Configurando o Módulo com `RouterModule.forChild`
Diferente do módulo principal (`AppModule`), que utiliza `RouterModule.forRoot()`, os módulos de funcionalidade utilizam o método `RouterModule.forChild()` para registrar as rotas secundárias.

#### Exemplo Prático de Implementação

Veja como estruturar o seu código em TypeScript para o módulo de rotas:

```TypeScript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes da funcionalidade
import { ClientListComponent } from './client-list.component';
import { ClientDetailComponent } from './client-detail.component';

// 1. Definição das rotas da feature
const clientRoutes: Routes = [
  { path: 'clients', component: ClientListComponent },
  { path: 'clients/:id', component: ClientDetailComponent }
];

@NgModule({
  imports: [
    // 2. Uso do forChild para rotas de funcionalidade
    RouterModule.forChild(clientRoutes)
  ],
  exports: [
    // 3. Exportação do RouterModule para que as diretivas de rota funcionem no módulo
    RouterModule
  ]
})
export class ClientRoutingModule { }
```

### Integrando ao Módulo da Funcionalidade (`ClientModule`)

Para que o Angular reconheça essas rotas, você deve importar o `ClientRoutingModule` dentro do `imports` do módulo principal da funcionalidade (`@NgModule` do `ClientModule`):

```TypeScript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientListComponent } from './client-list.component';
import { ClientDetailComponent } from './client-detail.component';

@NgModule({
  imports: [
    CommonModule,
    ClientRoutingModule // Importando o módulo de rotas aqui
  ],
  declarations: [
    ClientListComponent,
    ClientDetailComponent
  ]
})
export class ClientModule { }
```

### Pontos de Atenção Importantes

- **Ordem das Rotas**: No Angular, a ordem das rotas importa. Rotas mais específicas devem vir antes de rotas genéricas ou curingas (`**`).
- **Exportação do `RouterModule`**: Não se esqueça de incluir o `RouterModule` no array `exports` do seu `ClientRoutingModule`. Sem isso, componentes da funcionalidade não conseguirão interpretar diretivas como `routerLink`.


