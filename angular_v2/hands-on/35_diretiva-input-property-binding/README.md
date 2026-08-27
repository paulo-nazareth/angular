# Angular V2

## Aula 35 - Input e Property Binding de Diretivas

Diretivas de atributo no Angular se tornam dinâmicas e reconfiguráveis quando combinadas com os decoradores `@Input` e o recurso de Property Binding (`[propriedade]="valor"`).

### Conceitos Principais

- `@Input()`: Permite que a diretiva receba valores externos do componente pai.
- **Alias de **`@Input`: É possível atribuir o mesmo nome do seletor da diretiva ao `@Input` para simplificar o uso no HTML (passando o parâmetro diretamente no nome da diretiva).
- **Property Binding**: Associa dados de variáveis ou expressões do TypeScript às propriedades da diretiva.

### Exemplo Prático: Diretiva de Progresso Dinâmico

Diretiva que altera a cor de fundo e a largura de um elemento com base em parâmetros dinâmicos:

Para exemplificação foi criado a diretiva `highlight`.

```bash
# Criação da Diretiva
ng g d shared/highlight
```

```TypeScript
import { Directive, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appProgressBar]'
})
export class ProgressBarDirective implements OnChanges {
  // Input com alias: permite usar [appProgressBar]="valor" no HTML
  @Input('appProgressBar') progress: number = 0;

  // Inputs secundários para personalização de cores
  @Input() lowColor: string = '#f44336';  // Vermelho
  @Input() highColor: string = '#4caf50'; // Verde

  // Vincula propriedades CSS do elemento hospedeiro diretamente
  @HostBinding('style.width.%') width: number = 0;
  @HostBinding('style.backgroundColor') bgColor: string = '';
  @HostBinding('style.height.px') height: number = 20;

  // Atualiza os estilos sempre que os inputs mudarem
  ngOnChanges(changes: SimpleChanges): void {
    this.width = Math.min(Math.max(this.progress, 0), 100);
    this.bgColor = this.progress >= 50 ? this.highColor : this.lowColor;
  }
}
```

#### Uso no HTML com Property Binding

```HTML
<!-- 1. Passando valor direto pelo alias da diretiva -->
<div [appProgressBar]="75"></div>

<!-- 2. Passando expressões dinâmicas do componente e personalizando cores -->
<div 
  [appProgressBar]="valorDoProgresso" 
  [lowColor]="'orange'" 
  [highColor]="'blue'">
</div>

<!-- 3. Passando valores estáticos (sem colchetes) -->
<div appProgressBar="30" lowColor="darkred"></div>
```