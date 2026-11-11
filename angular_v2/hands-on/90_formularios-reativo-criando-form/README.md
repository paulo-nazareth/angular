# Angular V2

## Aula 90 - Formulários Reativos: Criando um form com Código Angular

No ecossistema do Angular Versão 2 (legado), a principal característica dos Formulários Reativos é que a estrutura lógica do formulário é definida inteiramente no código TypeScript.

Existem duas formas principais de instanciar e estruturar um `FormGroup` na classe do seu componente: de forma manual (direta) utilizando as classes fundamentais do Angular, ou de forma concisa utilizando o serviço utilitário `FormBuilder`.

### Forma 1: Instanciação Direta (Manual com `FormGroup` e `FormControl`)

Nesta abordagem, você cria a árvore de controles instanciando explicitamente as classes `FormGroup` e `FormControl` com a palavra-chave `new`.

#### Como funciona:

Cada campo do formulário é um objeto `FormControl` avulso, que recebe como parâmetros iniciais:

1. O valor inicial do campo (geralmente uma string vazia `''`).
2. Uma matriz (array) opcional contendo os validadores síncronos.

#### Exemplo Conceitual:

```TypeScript
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-manual',
  template: `...`
})
export class ManualComponent implements OnInit {
  formulario: FormGroup;

  ngOnInit() {
    // Instanciação manual utilizando 'new'
    this.formulario = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }
}
```

- **Vantagem**: Deixa transparente e explícita a arquitetura interna do Angular (mostrando claramente que cada campo é um `FormControl` independente).
- **Desvantagem**: Em formulários grandes com dezenas de campos, o código pode se tornar muito verboso e repetitivo devido à repetição constante de `new FormControl()`.

### Forma 2: Utilizando o Serviço `FormBuilder` (Abordagem Moderna e Concisa)

O `FormBuilder` é um serviço injetável fornecido pelo módulo `@angular/forms` que atua como um "açúcar sintático" (syntactic sugar). Ele simplifica drasticamente a criação de grupos e controles de formulário, reduzindo a quantidade de código boilerplate.

#### Como funciona:

Você injeta o `FormBuilder` no construtor do seu componente e utiliza o método `.group({})` para declarar o objeto. Para aplicar valores iniciais e validadores, basta passar um array `[valorInicial, validadores]` em vez de instanciar um `new FormControl()`.

#### Exemplo Conceitual:

```TypeScript
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-builder',
  template: `...`
})
export class BuilderComponent implements OnInit {
  formulario: FormGroup;

  // 1. Injetando o FormBuilder via Injeção de Dependência
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // 2. Construindo o FormGroup de forma concisa com o fb.group
    this.formulario = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]], // [valorInicial, [validadores]]
      email: ['', [Validators.required, Validators.email]]
    });
  }
}
```

- **Vantagem**: Código muito mais limpo, legível e direto ao ponto. É o padrão de mercado e a recomendação oficial da comunidade Angular para a grande maioria dos cenários.
- **Desvantagem**: Oculta levemente a criação dos objetos FormControl individuais, o que exige um breve entendimento prévio de como o Angular gerencia os bastidores.