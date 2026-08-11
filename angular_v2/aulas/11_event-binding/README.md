# Angular V2

## Aula 11 - Event Binding

### 3. Event Binding (evento)="metodo()"

Escuta eventos do usuário (como `click`, `keyup`, `submit`) e dispara um método na classe TypeScript.

- TypeScript:

```TypeScript
export class ContadorComponent {
  contador = 0;

  incrementar() {
    this.contador++;
  }
}
```

- Template (HTML):

```HTML
<p>Total: {{ contador }}</p>
<button (click)="incrementar()">Somar +1</button>
```

### Código Nativo

O Angula omitir a necessidade de declarar o `on-click` através do `(click)`, para facilitar a leitura e desenvolvimento do código.

```HTML
<!--- Código Resumido -->
<button class="btn btn-primary"
  (click)="clicado()">
  Clique Aqui!
</button>

<!--- Código Nativo -->
<button class="btn btn-info"
  on-click="clicado()">
  Clique Aqui!
</button>
```