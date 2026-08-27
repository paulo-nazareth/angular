# Angular V2

## Aula 09 - Property binding + Interpolation

## As 4 Sintaxes Principais

A magia do template acontece na forma como ele se comunica com a classe TypeScript do componente. Existem 4 formas principais de fazer essa integração:

![tipos-associacao](assets/tipos-associacao.png)

### 1. Interpolação {{ valor }}

Exibe dados da classe TypeScript diretamente no HTML.

- TypeScript:

```TypeScript
export class PerfilComponent {
  usuario = 'Carlos';
  idade = 28;
}
```

- Template (HTML):

```HTML
<h2>Usuário: {{ usuario }}</h2>
<p>Idade: {{ idade }} anos</p>
<p>Ano de nascimento: {{ 2026 - idade }}</p> <!-- Aceita expressões simples -->
```

#### Style Guide Angular

Como boa prática na decaração para facilitar a leitura recomenda-se colocar um espaço entre o nome do atributo e os chaves da interpolação ``{{ atributo }}``.

### 2. Property Binding [propriedade]="valor"

Associa uma propriedade de um elemento HTML (como `src`, `disabled`, `href`, `value`) a uma variável do TypeScript.

- TypeScript:

```TypeScript
export class BotaoComponent {
  urlImagem = 'assets/avatar.png';
  isDesabilitado = true;
}
```

- Template (HTML):

```HTML
<img [src]="urlImagem" alt="Foto do perfil">
<button [disabled]="isDesabilitado">Enviar</button>
```

#### Exemplos de declarações Property Binding

```html
  <img src="{{ urlImagem }}" alt="Imagem">

  <!-- Declaração Resumida da Declaração Nativa -->
  <img [src]="urlImagem" alt="Imagem">

  <!-- Declaração Nativa -->
  <img bind-src="urlImagem" alt="Imagem">
```

### Resumo Property Binding

![property-binding](assets/property-binding.png)

## Comandos Executados Para Criação de Projeto de Exemplo

```bash
# Criação Novo Projeto
ng new data-binding

# Criação Novo Componente
ng g c data-binding

#Saída
#  create src\app\data-binding\data-binding.component.css
#  create src\app\data-binding\data-binding.component.html
#  create src\app\data-binding\data-binding.component.spec.ts
#  create src\app\data-binding\data-binding.component.ts
#  update src\app\app.module.ts
```

### Código Canônico (Nativo)

O Angula omitir a necessidade de declarar o `bind-src` através do `[src]`, para facilitar a leitura e desenvolvimento do código.

```HTML
<!--- Código Resumido -->
<img [src]="urlImagem" alt="Imagem">

<!--- Código Canônico (Nativo) -->
<img bind-src="urlImagem" alt="Imagem">
```