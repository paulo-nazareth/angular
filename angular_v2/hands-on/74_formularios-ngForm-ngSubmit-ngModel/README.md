# Angular V2

## Aula 74 - Forms (template driven) Controles ngForm, ngSubmit e ngModel

No ecossistema do Angular Versão 2, os **Template-Driven Forms** utilizam três diretivas fundamentais para gerenciar o estado, submissão e rastreamento de dados diretamente no template HTML: `ngForm`, `ngSubmit` e `ngModel`.

Elas trabalham em conjunto nos bastidores para criar e monitorar a árvore de controles do formulário sem que você precise escrever código complexo de modelagem no TypeScript.

### 1. As Três Diretivas em Detalhes

- `ngForm`: É a diretiva raiz aplicada automaticamente (ou explicitamente referenciada) a qualquer tag `<form>`. Ela cria uma instância de `FormGroup` por trás dos panos e agrupa todos os controles internos, permitindo que você saiba o estado global do formulário (se é `valid`, `invalid`, `dirty`, `touched`, etc.).
- `ngSubmit`: É uma diretiva de evento associada ao formulário. Ela intercepta o evento nativo de envio (`submit`) do navegador, previne o comportamento padrão de recarregar a página e executa a função de callback associada no seu componente quando o botão de `submit` é acionado.
- `ngModel`: É a diretiva responsável pelo **Two-Way Data Binding** (vinculação bidirecional de dados) e pelo rastreamento individual de cada campo. Ela registra o `input` dentro do `ngForm` pai e sincroniza o valor entre o HTML e a classe do componente. (Nota: No Angular 2, para o ngModel funcionar isoladamente dentro de um formulário com nome, é obrigatório declarar o atributo `name` no elemento).

### 2. Exemplo Prático Completo

Para ver essas diretivas operando juntas, vamos criar um componente de cadastro rápido:

O Componente (`cadastro.component.ts`)

```TypeScript
import { Component } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  template: `
    <div style="margin: 20px;">
      <h2>Formulário Template-Driven (Angular 2)</h2>

      <!-- 1. ngForm exportado para uma variável de template (#f="ngForm") -->
      <form #f="ngForm" (ngSubmit)="onSubmit(f)">
        
        <div style="margin-bottom: 10px;">
          <label>Nome: </label>
          <!-- 2. ngModel com name obrigatório para rastreamento -->
          <input 
            type="text" 
            name="nome" 
            [(ngModel)]="usuario.nome" 
            required 
            minlength="3" 
            #nomeInput="ngModel" />
          
          <!-- Validação visual simples baseada no estado do ngModel -->
          <span style="color: red;" *ngIf="nomeInput.invalid && nomeInput.touched">
            Nome obrigatório (mínimo de 3 caracteres).
          </span>
        </div>

        <div style="margin-bottom: 10px;">
          <label>E-mail: </label>
          <input 
            type="email" 
            name="email" 
            [(ngModel)]="usuario.email" 
            required />
        </div>

        <!-- 3. ngSubmit aciona o método onSubmit passando a referência do formulário (f) -->
        <button type="submit" [disabled]="!f.valid">Salvar Dados</button>
      </form>

      <hr>
      
      <!-- Depuração em tempo real do estado do ngForm -->
      <h3>Estado do Formulário (ngForm):</h3>
      <p><strong>Válido?</strong> {{ f.valid }}</p>
      <p><strong>Modificado (Dirty)?</strong> {{ f.dirty }}</p>
      <p><strong>Valores Atuais:</strong> {{ f.value | json }}</p>
    </div>
  `
})
export class CadastroComponent {
  usuario = {
    nome: '',
    email: ''
  };

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Formulário Submetido com Sucesso!', form.value);
      alert('Dados salvos com sucesso!');
    }
  }
}
```

### 3. Configurando o Módulo Principal (`app.module.ts`)

Para que as diretivas `ngForm`, `ngSubmit` e `ngModel` funcionem, é obrigatório importar o `FormsModule` no seu módulo (`NgModule`):

```TypeScript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // NECESSÁRIO para Template-Driven Forms

import { AppComponent } from './app.component';
import { CadastroComponent } from './cadastro.component';

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule // Registra todas as diretivas de Template-Driven
  ],
  declarations: [ 
    AppComponent, 
    CadastroComponent 
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```




