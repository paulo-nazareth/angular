# Angular V2

## Aula 10 - Class e Style Binding

Class e Style Binding também são uma forma de Property Binding, mas que trabalha com CSS.

```bash
# Instalar Bootstrap
npm install ng2-bootstrap bootstrap --save

# Instalar Bootstrap (Versões Legado)
npm install ng2-bootstrap@1.6.0 bootstrap@3.3.7 --save
```

No Angular moderno, a manipulação de CSS (classes e estilos inline) no template é feita de forma reativa e declarativa. Ela permite adicionar, remover ou modificar o visual dos elementos com base no estado do componente.

Historicamente (na época do "Angular 2" inicial), utilizavam-se muito as diretivas `ngClass` e `ngStyle`. Hoje em dia, o Angular prefere as sintaxes nativas `[class]` e `[style]`, que são mais performáticas e limpas.

### 1. Class Binding ([class])

O Class Binding é usado para adicionar ou remover classes CSS de um elemento dinamicamente.

#### A) Alternar uma única classe (Sintaxe de Booleano)

Sintaxe: `[class.nome-da-classe]="condicao"`

```TypeScript
@Component({
  standalone: true,
  template: `
    <!-- A classe 'ativo' será adicionada se isAtivo() for true -->
    <button [class.ativo]="isAtivo()">Clique Aqui</button>

    <!-- A classe 'erro' será aplicada se a propriedade tiver valor true -->
    <div [class.erro]="temErro">Mensagem de alerta</div>
  `
})
export class MeuComponente {
  isAtivo = signal(true);
  temErro = false;
}
```

#### B) Aplicar uma classe dinâmica a partir de uma string

Sintaxe: `[class]="nomeDaVariavel"`

```TypeScript
@Component({
  standalone: true,
  template: `
    <!-- Define a classe exata com base na string do TypeScript -->
    <div [class]="tipoBotao">Conteúdo</div>
  `
})
export class MeuComponente {
  // O elemento receberá class="btn-primary"
  tipoBotao = 'btn-primary'; 
}
```

#### C) Aplicar múltiplas classes com Objetos

Sintaxe: `[class]="{ 'classe1': condicao1, 'classe2': condicao2 }"`

```TypeScript
@Component({
  standalone: true,
  template: `
    <div [class]="{
      'card': true,
      'card-destaque': isDestaque(),
      'desabilitado': isDisabled
    }">
      Cartão Reativo
    </div>
  `
})
export class MeuComponente {
  isDestaque = signal(true);
  isDisabled = false;
}
```

### 2. Style Binding ([style])

O Style Binding altera estilos inline de um elemento diretamente no HTML.

#### A) Definir uma propriedade individual de estilo

Sintaxe: `[style.propriedadeCss]="valor"`

```TypeScript
@Component({
  standalone: true,
  template: `
    <!-- Aplica a cor definida no TypeScript -->
    <p [style.color]="corTexto">Texto com cor dinâmica</p>

    <!-- Aceita expressões diretamente no template -->
    <div [style.display]="isVisivel ? 'block' : 'none'">
      Conteúdo Condicional
    </div>
  `
})
export class MeuComponente {
  corTexto = '#ff5722';
  isVisivel = true;
}
```

#### B) Passando Unidades de Medida (Sintaxe de Sufixo)

Para propriedades como `width`, `height`, `margin` ou `font-size`, você pode adicionar o sufixo diretamente na propriedade binding (ex: `.px`, `.rem`, `.%`).

```TypeScript
@Component({
  standalone: true,
  template: `
    <!-- O Angular adiciona 'px' automaticamente ao número -->
    <div [style.width.px]="largura">Elemento</div>

    <!-- Adiciona '%' automaticamente -->
    <div [style.height.%]="porcentagem">Progresso</div>
  `
})
export class MeuComponente {
  largura = 300; // Resulta em style="width: 300px;"
  porcentagem = 75; // Resulta em style="height: 75%;"
}
```

#### C) Aplicar múltiplos estilos com Objetos

Sintaxe: `[style]="{ propriedade: valor }"`

```TypeScript
@Component({
  standalone: true,
  template: `
    <div [style]="{
      color: corTexto,
      fontSize: tamanhoFonte + 'px',
      backgroundColor: 'lightgray'
    }">
      Caixa Estilizada
    </div>
  `
})
export class MeuComponente {
  corTexto = 'blue';
  tamanhoFonte = 18;
}
```

### 3. Onde ficaram ngClass e ngStyle?

No Angular moderno, você raramente precisa de `ngClass` ou `ngStyle`.

A sintaxe nativa `[class]` e `[style]` faz exatamente o mesmo papel, não necessita de importação do CommonModule em componentes Standalone e possui melhor performance por não depender de diretivas externas.

| Caso de Uso | Usando Sintaxe Nativa (Recomendado) | Usando a Diretiva Antiga (NgClass/NgStyle) |
| :--- | :--- | :--- |
| **Classe única** | `<div [class.ativo]="isAtivo">` | (Sem equivalente direto simples) |
| **Múltiplas classes** | `<div [class]={ 'ativo': isAtivo }>` | `<div [ngClass]={ 'ativo': isAtivo }>` |
| **Estilo individual** | `<div [style.color]="cor">` | (Sem equivalente direto simples) |
| **Com Unidade** | `<div [style.width.px]="300">` | (Exige concatenação de string manual) |