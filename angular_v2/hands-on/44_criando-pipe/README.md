# Angular V2

## Aula 44 - Criando um Pipe

Criar um pipe personalizado permite aplicar regras específicas de formatação aos dados diretamente na camada de visualização. Para isso, o Angular exige o uso do decorador `@Pipe` e da interface `PipeTransform`.

### 1. Criando a Classe do Pipe

Este exemplo cria um pipe chamado `resumo` que corta textos muito longos e adiciona reticências no final. Ele recebe um parâmetro opcional para definir o limite de caracteres.

```TypeScript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resumo',
  // standalone: true // Opcional: Adicione se estiver usando Angular 14+ em modo Standalone
})
export class ResumoPipe implements PipeTransform {
  
  // O primeiro parâmetro é sempre o valor da esquerda do pipe.
  // Os parâmetros seguintes são passados após os dois-pontos (:).
  transform(valor: string, limite: number = 50): string {
    if (!valor) return '';
    
    if (valor.length <= limite) {
      return valor;
    }
    
    return valor.substring(0, limite) + '...';
  }
}
```

#### Entendendo a Estrutura

- `@Pipe({ name: 'resumo' })`: Define o identificador exato que será usado nos templates HTML.
- `PipeTransform`: Uma interface do núcleo do Angular que força a classe a implementar o método `transform()`.
- `transform()`: O método onde a mágica acontece. Ele recebe o dado original, aplica a lógica JavaScript necessária e retorna a versão final formatada.

### 2. Utilizando no Template HTML

Uma vez criado, você pode aplicar o pipe encadeando-o normalmente, passando os argumentos separados por dois-pontos.

```HTML
<!-- Retorna os primeiros 50 caracteres (valor padrão definido na classe) -->
<p>{{ textoLongo | resumo }}</p>

<!-- Retorna apenas os primeiros 15 caracteres -->
<p>{{ textoLongo | resumo:15 }}</p>

<!-- Pode ser aninhado com outros pipes nativos -->
<p>{{ textoLongo | resumo:20 | uppercase }}</p>
```

### 3. Registro no Módulo

Se a sua aplicação não utiliza a arquitetura moderna Standalone, você deve registrar o seu novo pipe para que os componentes o reconheçam. Basta adicioná-lo ao array `declarations` do seu módulo (geralmente o `AppModule`).

```TypeScript
import { NgModule } from '@angular/core';
import { ResumoPipe } from './resumo.pipe';

@NgModule({
  declarations: [
    // ... outros componentes
    ResumoPipe
  ],
  // ...
})
export class AppModule { }
```

```bash
ng g pipe camel-case
```