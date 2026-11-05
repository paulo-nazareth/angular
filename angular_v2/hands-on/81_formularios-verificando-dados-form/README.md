# Angular V2

## Aula 81 - Forms (Dica): Verificando Dados do Form no Template com JSON

Debug utilizando pipes, para utilizarmos enquanto estivermos desenvolvendo.

```bash
# Criação do Componente FormDebugComponent
ng g c form-debug
```

No ecossistema do Angular Versão 2, uma das técnicas de depuração (*debugging*) mais práticas e utilizadas por desenvolvedores em formulários **Template-Driven** é o uso do **Pipe** `json` (`| json`).

Como os formulários baseados em template gerenciam estados complexos nos bastidores (validade, toque, modificação e valores), utilizar o pipe `json` permite que você "injete" a representação visual do objeto de controle diretamente no HTML, permitindo acompanhar cada alteração em tempo real sem precisar abrir o console do navegador o tempo todo.

### Como Funciona o Pipe `json`

O operador pipe `| json` pega qualquer objeto ou array JavaScript e o converte para uma string formatada no padrão JSON (equivalente a usar `JSON.stringify()`). Para que as quebras de linha e a indentação sejam exibidas corretamente no navegador, costuma-se envolvê-lo em uma tag HTML `<pre>`.

### Exemplo Prático: Painel de Depuração no Template

O Componente (`debug-form.component.ts`)

```TypeScript
import { Component } from '@angular/core';

@Component({
  selector: 'app-debug-form',
  template: `
    <div style="margin: 20px; font-family: sans-serif; display: flex; gap: 30px;">
      
      <!-- Lado esquerdo: O Formulário -->
      <div style="flex: 1;">
        <h2>Formulário de Cadastro</h2>

        <form #f="ngForm" (ngSubmit)="onSubmit(f)">
          
          <div style="margin-bottom: 15px;">
            <label>Nome Completo: </label><br>
            <input 
              type="text" 
              name="nome" 
              [(ngModel)]="usuario.nome" 
              required 
              minlength="3" />
          </div>

          <div style="margin-bottom: 15px;">
            <label>E-mail: </label><br>
            <input 
              type="email" 
              name="email" 
              [(ngModel)]="usuario.email" 
              required 
              email />
          </div>

          <button type="submit" [disabled]="!f.valid">Salvar Dados</button>
        </form>
      </div>

      <!-- Lado direito: Painel de Depuração em Tempo Real -->
      <div style="flex: 1; background: #f9f9f9; padding: 15px; border: 1px solid #ddd; border-radius: 4px;">
        <h3>🔍 Painel de Debug (ngForm)</h3>
        
        <p><strong>Formulário Válido (valid):</strong> {{ f.valid }}</p>
        <p><strong>Modificado (dirty):</strong> {{ f.dirty }}</p>
        <p><strong>Tocado (touched):</strong> {{ f.touched }}</p>

        <hr>

        <h4>Valores Atuais (f.value):</h4>
        <!-- O Pipe JSON exibe o objeto estruturado em tempo real -->
        <pre style="background: #eee; padding: 10px; border-radius: 4px; font-size: 12px;">{{ f.value | json }}</pre>
      </div>

    </div>
  `
})
export class DebugFormComponent {
  usuario = {
    nome: '',
    email: ''
  };

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Objeto enviado:', form.value);
      alert('Enviado com sucesso!');
    }
  }
}
```

### Vantagens de Usar o Pipe `json` durante o Desenvolvimento

1. **Feedback Visual Imediato**: Você digita no input e vê instantaneamente as propriedades do objeto sendo atualizadas caractere por caractere.
2. **Inspeção de Subgrupos**: Se você utilizar `ngModelGroup` para criar objetos aninhados, o pipe `json` exibirá perfeitamente a árvore de hierarquia dos dados.
3. **Economia de Tempo**: Evita a necessidade de criar vários `console.log()` ou inspecionar elementos complexos via DevTools para entender o que o formulário está capturando.