# Angular V2

## Aula 12 - Two-way Data Binding

Utiliza tanto o Binding de Eventos quanto o de Propriedades juntos.

    Nota: A sintaxe `[()]` é conhecida como Banana In a Box ("Banana na Caixa"), assim facilita lembrar da declaração.

### 4. Two-Way Data Binding [(ngModel)]="variavel"

Sincronização em tempo real nas duas direções: se o usuário digita no campo de texto, a variável no TypeScript atualiza. Se a variável muda no código, o campo de texto na tela atualiza.

    Nota: Requer a importação do FormsModule no componente.

- TypeScript:

```TypeScript
export class BuscaComponent {
  termoBusca = '';
}
```

- Template (HTML):

```HTML
<input [(ngModel)]="termoBusca" placeholder="Digite sua busca...">
<p>Você está buscando por: {{ termoBusca }}</p>
```

### Código Canônico (Nativo)

O Angula omitir a necessidade de declarar o `bindon-ngModel` através do `[(ngModel)]`, para facilitar a leitura e desenvolvimento do código.

```HTML
<!--- Código Resumido -->
<input type="text" [(ngModel)]="nome">

<!--- Código Canônico (Nativo) -->
<input type="text" bindon-ngModel="nome">
```
