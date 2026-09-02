# Angular V2

## Aula 43 - Pipes (usando pipes, parâmetros e pipes aninhados)

### O que são `Pipes`?

`Pipes` são funções simples utilizadas em templates do Angular para transformar a exibição de dados (como formatar datas, converter textos em maiúsculas ou exibir valores monetários) sem alterar os dados originais na classe TypeScript.

```bash
# Criação do Novo Projeto pipes
ng new pipes --style=scss --skip-install

#Criação do Novo Componente
ng g c exemplos-pipes
```

```
# Desativar warning Deprecation
ng set --global warnings.packageDeprecation=false
```

### Como Usar `Pipes` Básicos

A aplicação de um pipe é feita utilizando o caractere de barra vertical (`|`) após a variável ou expressão, seguido pelo nome do pipe.

```HTML
<!-- Transforma o texto em letras maiúsculas -->
<p>{{ nome | uppercase }}</p>

<!-- Formata um objeto Date para o formato padrão curto -->
<p>{{ dataAtual | date:'shortDate' }}</p>
```

### Pipes com Parâmetros

É possível customizar o comportamento de um pipe passando parâmetros adicionais separados por dois-pontos (`:`). Caso haja múltiplos parâmetros, cada um é delimitado por novos dois-pontos.

```HTML
<!-- Formata um número com casas decimais específicas (mínimo de inteiros . mínimo-máximo de decimais) -->
<p>{{ preco | number:'1.2-2' }}</p>

<!-- Formata uma data utilizando um padrão de máscara customizado -->
<p>{{ dataAtual | date:'dd/MM/yyyy HH:mm' }}</p>

<!-- Formata um valor monetário utilizando a moeda Real (BRL) -->
<p>{{ valor | currency:'BRL':'symbol':'1.2-2' }}</p>
```

### Pipes Aninhados (Chained Pipes)

Você pode encadear múltiplos pipes em sequência. O resultado da transformação do primeiro pipe é repassado como entrada para o pipe seguinte.

```HTML
<!-- Primeiro converte a data para formato de texto completo e, em seguida, transforma tudo em maiúsculas -->
<p>{{ dataAtual | date:'fullDate' | uppercase }}</p>

<!-- Primeiro converte o texto para minúsculas e depois aplica a capitalização de título -->
<p>{{ mensagem | lowercase | titlecase }}</p>
```

### Principais Pipes Nativos do Angular

| Nome do Pipe | Descrição | Exemplo de Uso |
| :--- | :--- | :--- |
| `uppercase` / `lowercase` | Altera a caixa das letras de uma string | `{{ 'angular' \| uppercase }}`  `ANGULAR` |
| `date` | Formata objetos de data com base em padrões | `{{ data \| date:'dd/MM/yyyy' }}` |
| `number` | Formata números e casas decimais | `{{ 1234.56 \| number:'1.1-1' }}` |
| `currency` | Formata números para o padrão monetário | `{{ 49.9 \| currency:'BRL' }}` |
| `percent` | Transforma um número decimal em porcentagem | `{{ 0.75 \| percent }}` 75% |
| `json` | Serializa objetos em string JSON (ideal para debug) | `{{ usuario \| json }}` |
| `async` | Realiza a inscrição (subscribe) automática em Observables ou Promises | `{{ dados$ \| async }}` |