# Angular V2

## Aula 75 - Forms (template driven) Inicializando valores com ngModel

No ecossistema do Angular Versão 2, inicializar valores em um formulário **Template-Driven** é um processo simples: como o formulário é orientado ao modelo do componente, basta definir os valores iniciais nas propriedades da classe TypeScript e vinculá-las aos inputs utilizando a diretiva `ngModel`.

Existem duas formas principais de fazer isso com o `ngModel`: através do **Two-Way Data Binding** (`[(ngModel)]`) ou do **Property Binding unidirecional** (`[ngModel]`).

### Formas de Inicialização com `ngModel`

- **Two-Way Binding (`[(ngModel)]`)**: É a forma mais comum. O valor inicial definido no TypeScript é exibido no input, e qualquer alteração feita pelo usuário atualiza automaticamente a propriedade no componente.
- **Property Binding (`[ngModel]`)**: Utilizado quando você quer apenas injetar o valor inicial (leitura), mas precisa capturar as mudanças de outra forma (geralmente combinando com o evento `(ngModelChange)`).

### Exemplo Prático Completo

Vamos criar um componente de edição onde os dados do usuário já vêm preenchidos (simulando uma busca prévia em um serviço):

1. O Componente (`editar-usuario.component.ts`)

```TypeScript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-usuario',
  template: `
    <div style="margin: 20px;">
      <h2>Editar Perfil (Template-Driven com Valores Iniciais)</h2>

      <form #f="ngForm" (ngSubmit)="onSubmit(f)">
        
        <div style="margin-bottom: 10px;">
          <label>Nome: </label>
          <!-- Inicializando o valor via Two-Way Data Binding -->
          <input 
            type="text" 
            name="nome" 
            [(ngModel)]="usuario.nome" 
            required 
            #nomeInput="ngModel" />
        </div>

        <div style="margin-bottom: 10px;">
          <label>E-mail: </label>
          <input 
            type="email" 
            name="email" 
            [(ngModel)]="usuario.email" 
            required />
        </div>

        <div style="margin-bottom: 10px;">
          <label>Perfil de Acesso: </label>
          <!-- Inicializando um Select/Dropdown -->
          <select name="perfil" [(ngModel)]="usuario.perfil">
            <option value="admin">Administrador</option>
            <option value="user">Usuário Comum</option>
            <option value="guest">Convidado</option>
          </select>
        </div>

        <button type="submit" [disabled]="!f.valid">Salvar Alterações</button>
      </form>

      <hr>
      <h3>Estado Atual no Objeto TypeScript:</h3>
      <p>{{ usuario | json }}</p>
    </div>
  `
})
export class EditarUsuarioComponent implements OnInit {
  
  // Objeto que serve como modelo inicial
  usuario = {
    nome: '',
    email: '',
    perfil: ''
  };

  ngOnInit() {
    // Simulando a carga de dados de uma API (ex: UserService.getUsuario(1))
    setTimeout(() => {
      this.usuario = {
        nome: 'Maria Oliveira',
        email: 'maria.oliveira@email.com',
        perfil: 'admin'
      };
    }, 500); // Simula um pequeno atraso de requisição assíncrona
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Dados atualizados:', form.value);
      alert('Alterações salvas com sucesso!');
    }
  }
}
```

### 2. O Módulo Principal (`app.module.ts`)

Lembre-se de que o `FormsModule` é obrigatório para que o `ngModel` processe tanto a leitura quanto a escrita de valores em formulários template-driven.

```TypeScript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // OBRIGATÓRIO

import { AppComponent } from './app.component';
import { EditarUsuarioComponent } from './editar-usuario.component';

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule 
  ],
  declarations: [ 
    AppComponent, 
    EditarUsuarioComponent 
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```