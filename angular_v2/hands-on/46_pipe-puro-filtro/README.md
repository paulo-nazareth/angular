# Angular V2

## Aula 46 - Pipes: Criando um Pipe Puro (Criando um Pipe de Filtro)

Por padrão, todos os Pipes no Angular são puros (Pure Pipes). Um Pipe puro é otimizado para performance: o Angular só executa a função `transform()` quando detecta uma mudança pura na referência da variável de entrada (um novo valor primitivo ou uma nova referência de objeto/array), e não em cada ciclo de verificação de mudanças (*Change Detection*).

### 1. Criando o Pipe Puro de Filtro

Este exemplo cria o pipe `filtroArray`, que filtra um array de strings ou objetos com base em um texto de busca.

```TypeScript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroArray',
  pure: true // 'true' é o padrão, declarado aqui para fins explicativos
})
export class FiltroArrayPipe implements PipeTransform {

  transform(array: any[], campo: string, texto: string): any[] {
    if (!array || !texto || texto.trim() === '') {
      return array;
    }

    const termo = texto.toLowerCase();

    return array.filter(item => {
      // Se for um array de objetos, filtra pela propriedade especificada
      if (typeof item === 'object' && item !== null && campo) {
        return item[campo]?.toString().toLowerCase().includes(termo);
      }
      // Se for um array de tipos primitivos (strings/números)
      return item.toString().toLowerCase().includes(termo);
    });
  }
}
```

### 2. Utilizando no Template HTML

```HTML
<input type="text" [(ngModel)]="termoBusca" placeholder="Filtrar frutas...">

<ul>
  <!-- Filtra o array de frutas conforme o usuário digita -->
  <li *ngFor="let fruta of frutas | filtroArray: '': termoBusca">
    {{ fruta }}
  </li>
</ul>
```

### 3. O Comportamento Importante dos Pipes Puros com Arrays e Objetos

Como o Pipe puro só avalia a referência de memória, se você adicionar um item ao array usando `.push()`, o Angular NÃO reexecutará o Pipe, pois a referência do array continua sendo a mesma!

❌ Não aciona a atualização do Pipe puro:

```TypeScript
// A referência do array frutas não mudou, apenas o seu conteúdo interno.
this.frutas.push('Laranja');
```

✅ Aciona a atualização do Pipe puro (Imutabilidade):

```TypeScript
// Cria-se uma nova referência de array usando o operador spread.
this.frutas = [...this.frutas, 'Laranja'];
```

### Por que a documentação oficial do Angular não recomenda Pipes de Filtro?

**Atenção**: A equipe do Angular desencoraja o uso de Pipes para filtragem e ordenação de listas. Pipes de filtro exigem a criação de novas referências de array a cada alteração, ou o uso de Impure Pipes (que rodam em cada frame de alteração e causam gargalos de performance). A boa prática oficial é filtrar os dados diretamente na classe TypeScript ou através de reatividade com RxJS.

Para Exemplificar o Pipe Puro, foi criado um novo Pipe chamado `filtro-array`

```bash
ng g p filtro-array
```

**Nota**: Apenas para fins didaticos e não deve ser utilizado em produção, sendo apresentado a solução recomendada posteriormente.

OBS: A lista de objetos não é atualizada ao adicionar um novo elemento utilizando o Pipe Puro.