# Angular V2

## Aula 31 - Operador Elvis ("?")

O Operador Elvis (`?.`), oficialmente chamado de **Navegação Segura** (*Safe Navigation Operator*), serve para evitar erros de execução (*null pointer exceptions*) ao tentar acessar propriedades de objetos que podem estar indefinidos (`undefined`) ou nulos (`null`).

Sem esse operador, se você tentar acessar uma propriedade de algo inexistente no template HTML, o Angular lança um erro do tipo `Cannot read property 'nome' of undefined` e para de renderizar o componente.

Para exemplificação do operador foi criado o componente `operador-elvis`.

```bash
ng g c operador-elvis
```

### Exemplo do Problema sem o Operador Elvis

Imagine que seu componente faz uma requisição HTTP para carregar os dados de um usuário:

```TypeScript
// Componente TypeScript
export class MeuComponenteComponent {
  usuario: any; // Inicia como undefined enquanto aguarda a API
}
```

No HTML:

```HTML
<!-- ERRO NO CONSOLE! O Angular tenta ler usuario.nome antes da API responder -->
<p>Nome do usuário: {{ usuario.nome }}</p>
```

### Como Solucionar com o Operador Elvis (`?.`)

Ao adicionar o ponto de interrogação antes do ponto de acesso, o Angular verifica se o objeto existe antes de tentar ler a propriedade interna. Se for `null` ou `undefined`, ele simplesmente ignora a leitura e exibe um valor em branco sem quebrar a aplicação:

```HTML
<!-- SEGURO: Se 'usuario' for null/undefined, não lança erro -->
<p>Nome do usuário: {{ usuario?.nome }}</p>
```

#### Acessando Múltiplos Níveis Subjacentes

O operador pode ser encadeado em estruturas de dados profundas ou aninhadas:

```HTML
<!-- Verifica se 'usuario' existe; se sim, verifica se 'endereco' existe; se sim, lê 'cidade' -->
<p>Cidade: {{ usuario?.endereco?.cidade }}</p>
```

### Operador Elvis vs `*ngIf`

Ambas as abordagens resolvem o problema de dados assíncronos, mas em cenários ligeiramente diferentes:

| Abordagem | Exemplo | Quando Usar |
| :--- | :--- | :--- |
| Operador Elvis | {{ usuario?.nome }} | Para exibir campos individuais no HTML quando o elemento pai deve continuar visível na tela. |
| `*ngIf` | `<div *ngIf="usuario">...</div>` | Para esconder blocos inteiros de HTML até que o objeto principal seja carregado. |