# Angular V2

## Aula 47 - Pipes: Pipe Impuro

Um Pipe Impuro (*Impure Pipe*) é uma transformação que o Angular reexecuta a cada ciclo de detecção de mudanças (*Change Detection*), independentemente de o valor de entrada ter mudado a sua referência de memória ou não.

Por padrão, todos os pipes criados no Angular são puros (`pure: true`). Para definir um pipe como impuro, você deve configurar explicitamente a propriedade `pure: false` no decorador `@Pipe`.

### 1. A Diferença de Comportamento

- **Pipe Puro** (`pure: true`): O método `transform()` só é chamado quando o Angular detecta uma alteração em um valor primitivo (`string`, `number`, `boolean`) ou se a **referência de memória** de um objeto/array for substituída por uma nova (através de imutabilidade).
- **Pipe Impuro** (`pure: false`): O método `transform()` é chamado a cada evento na interface (cliques do mouse, pressionar de teclas, respostas de requisições HTTP, timers, etc.), verificando se o retorno precisa ser reavaliado.

### 2. Criando um Pipe Impuro

Um exemplo clássico para o uso de um pipe impuro é a filtragem de listas onde novos itens são adicionados usando `.push()` (mutação interna do array) em vez de recalcular uma nova referência de memória.

```TypeScript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroImpuro',
  pure: false // Desativa a otimização padrão de verificação de referência
})
export class FiltroImpuroPipe implements PipeTransform {

  transform(itens: any[], termo: string): any[] {
    if (!itens || !termo) {
      return itens;
    }
    
    console.log('Pipe impuro executado!'); // Será chamado a cada ciclo de Change Detection
    return itens.filter(item => item.toLowerCase().includes(termo.toLowerCase()));
  }
}
```

### 3. Impacto de Performance e Cuidados

Como o Angular executa o método `transform()` de um pipe impuro dezenas de vezes por segundo em aplicações reais, existem riscos sérios de performance:

- **Operações Pesadas**: Evite laços de repetição longos, ordenações de listas grandes ou manipulação de strings complexas dentro de um pipe impuro, pois isso deixará a interface lenta e travada.
- **Efeitos Colaterais**: O método `transform()` de um pipe impuro **nunca** deve fazer chamadas HTTP ou alterar estados externos da aplicação, pois criará um *loop* infinito de atualização.

### Pipes Impuros Nativos do Angular

O Angular possui pipes nativos que são intrinsecamente impuros devido à sua natureza dinâmica:

- **AsyncPipe (`async`)**: É impuro porque precisa ouvir ativamente a emissão de novos valores de um Observable ou Promise e atualizar o template assim que os dados chegarem.
- **SlicePipe e KeyValuePipe**: Reagem a alterações internas em arrays e objetos mesmo que a referência do container não mude.

Para Exemplificar o Pipe Impuro, foi criado um novo Pipe chamado `filtro-array-impuro`

```bash
ng g p filtro-array-impuro
```