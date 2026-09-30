# Angular V2

## Aula 61 - Rotas Filhas: Desenvolvendo as Telas

Para exemplificação das rotas filhas, criaremos um serviço `AlunosService`.

```bash
# Criação o Serviço AlunoService
ng g s alunos/alunos
```

Após a criação do serviço, necessário incluir nos `providers` do módulo `AlunosModule`, para permitir a injeção de dependência.

Lembrando ainda que para utilizar o `[(ngModel)]`, apresentando os valores no formulário é necessário importar o `FormsModule`, no `aluno.module.ts`.

```Typescript
import { FormsModule } from "@angular/forms";
@NgModule({
    imports: [ 
        FormsModule,
    ],
```

Nota: Infelizmente não é possível passar o objeto como parametro, é necessário informar o ID e recuperar o registro para cada requisição.

### Materialize

Durante a construção do formulário, para que o label não sobreposse o valor do input, foi necessário adicionar a classe:

```html
    class="active"
```