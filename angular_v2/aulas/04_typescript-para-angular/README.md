# Angular V2

## Aula 04 - Introdução ao TypeScript para Angular

### Javascript Vanilla (Puro)

JavaScript Vanilla (ou JS Puro) é o termo usado para descrever o uso da linguagem JavaScript nativa, sem o auxílio de bibliotecas (como jQuery) ou frameworks (como React, Vue ou Angular).

Trata-se de usar diretamente os recursos e APIs fornecidos pelos próprios navegadores web.

### Principais Pilares do JavaScript Moderno

Com as evoluções do ecossistema a partir do ES6 (ECMAScript 2015), o JavaScript nativo ganhou recursos extremamente poderosos que eliminaram a necessidade de bibliotecas auxiliares para tarefas comuns.

#### 1. Manipulação do DOM (Document Object Model)

Acessar e alterar elementos na página de forma simples e direta:

```JavaScript
// Selecionando elementos
const botao = document.querySelector('#meu-botao');
const titulo = document.querySelector('.titulo-principal');

// Adicionando eventos e alterando conteúdo/estilo
botao.addEventListener('click', () => {
  titulo.textContent = 'Texto alterado com Vanilla JS!';
  titulo.classList.toggle('destaque');
});
```

#### 2. Requisições Assíncronas (Fetch API e async/await)

Substituiu o antigo XMLHttpRequest e a biblioteca axios para consumo de dados e APIs:

```JavaScript
async function carregarDados() {
  try {
    const resposta = await fetch('https://api.example.com/dados');
    const dados = await resposta.json();
    console.log(dados);
  } catch (erro) {
    console.error('Erro ao buscar dados:', erro);
  }
}
```

#### 3. Recursos do ES6+

A linguagem nativa oferece recursos modernos de sintaxe e estrutura:

- **Sintaxe Limpa**: Arrow functions (() => {}), Template Literals (`Olá, ${nome}`).
- **Desestruturação**: Extração rápida de valores de objetos e arrays (const { nome, idade } = usuario).
- **Métodos de Array**: map, filter, reduce para manipulação rápida de listas de dados sem loops manuais.
- **Módulos Nativos**: Organização do código em múltiplos arquivos com import e export.

## Exemplo de Compilação do TypeScript

### Arquivo TypeScript

No diretorio desejado, crie um arquivo `main.ts` e insira o respectivo conteúdo:

```javascript
var minhaVar = 'Minha Variavel';

function minhaFunc(x, y){
    return x + y;
}

//ES 6 ou ES 2015
let num = 2;
const PI = 3.14;
```

Comando para compilar o TypeScript

```bash
tsc main.ts
```

Será gerado o `main.js`, ao realizar este passos com declarações de variaveis no padrão ES 6 ou ES 2015, para teste do ECMA Script 2015. Percebemos que o `let` e o `const` foram substituidos por `var`.

### Site Recomendado

https://es6-features.org/#Constants

### Transpilar

Transformando TypeScripts em JavaScript Puro.

https://babeljs.io



