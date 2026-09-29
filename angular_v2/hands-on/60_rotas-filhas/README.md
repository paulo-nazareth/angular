# Angular V2

## Aula 60 - Rotas Filhas

No Angular, o conceito de Rotas Filhas (Child Routes) é ideal para quando você possui uma estrutura de layout aninhada, por exemplo, uma tela de gerenciamento de alunos onde o componente principal (`AlunosComponent`) exibe um menu ou lista lateral e precisa renderizar detalhes ou formulários de alunos na mesma tela, sem recarregar o layout base.

Para que as rotas filhas funcionem, o componente pai (`AlunosComponent`) precisa obrigatoriamente ter a sua própria tag `<router-outlet></router-outlet>` no template HTML.

Para colocar em prática o entendimento de rotas, criaremos um novo módulo `Alunos`.

```bash
 ng g c alunos
```

Dica: Criou uma nova funcionalidade com componente que necessitem de um novo módulo, ao criar o componente, já crie o módulo (`alunos.module.ts`).

```Typescript
/*Snippet Module*/
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [ 
        CommonModule
    ],
    exports: [],
    declarations: [
        
    ],
    providers: [ ]
})
export class AlunosModule {

}
```

### Criando Componentes Filhos

```bash
# Criação do Componente AlunoForm
ng g c alunos/aluno-form

# Criação do Componente AlunoDetalhe
ng g c alunos/aluno-detalhe
```