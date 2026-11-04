# Angular V2

## Aula 76 - Forms (template driven) Módulos e FormsModule

No ecossistema do Angular Versão 2, os módulos (`NgModule`) funcionam como o mecanismo central para organizar a aplicação em blocos coesos de funcionalidade. Quando falamos especificamente de Template-Driven Forms, a importação correta do `FormsModule` é o requisito número um para que as diretivas de formulário funcionem.

Sem ele, o Angular trata tags como `<form>` e `<input> de forma puramente HTML nativa, ignorando completamente o gerenciamento de estado e validação.
`
Para exemplificação dos eventuais problemas que pode ocorrer em módulos sem a declaração do `FormsModule`, criaremos o módulo `TemplateFormModule`.

```bash
# Criação Módulo de Exemplo TemplateFormModule
ng g m template-form
```

### 1. O Papel do `FormsModule`

O `FormsModule` é o módulo oficial do Angular que agrupa todas as diretivas e provedores necessários para construir e manipular formulários baseados em template. Quando você o importa no seu `NgModule`, ele disponibiliza no escopo dos seus componentes ferramentas essenciais como:

- `ngForm`: Cria a instância automática do formulário no elemento `<form>`.
- `ngModel`: Ativa o two-way data binding e registra o controle individual.
- `ngModelGroup`: Permite criar subgrupos lógicos de dados dentro do formulário.
- **Diretivas de Validação Nativa**: Como `required`, `minlength`, `maxlength`, `pattern`, etc., transformando-as em estados reativos no objeto de controle.

### 2. Exemplo Prático de Configuração no AppModule

Para que qualquer formulário template-driven funcione na sua aplicação Angular 2, você deve importar o `FormsModule` dentro do array `imports` do seu módulo principal (ou do módulo feature onde o formulário será utilizado).

O Arquivo `app.module.ts`:

```TypeScript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // 1. Importando o FormsModule

import { AppComponent } from './app.component';
import { MeuFormularioComponent } from './meu-formulario.component';

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule // 2. Registrando o módulo no array imports do NgModule
  ],
  declarations: [ 
    AppComponent, 
    MeuFormularioComponent 
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

### 3. O Erro Comum: O que acontece se você esquecer o `FormsModule`?

Se você tentar utilizar diretivas como `[(ngModel)]` ou `#f="ngForm"` em um template sem ter importado o `FormsModule` no módulo correspondente, o compilador do Angular 2 disparará um erro clássico no console do navegador:

    "Can't bind to 'ngModel' since it isn't a known property of 'input'."

Esse erro indica que o template parser do Angular encontrou uma diretiva que não está registrada em nenhum módulo acessível pelo componente.

