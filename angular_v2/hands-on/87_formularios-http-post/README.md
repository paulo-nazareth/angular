# Angular V2

## Aula 87 - Forms (template driven) Submetendo Valores com HTTP POST

No ecossistema do Angular Versão 2 (legado), após validar e estruturar um formulário Template-Driven, o próximo passo natural é enviar os dados coletados (`form.value`) para um servidor backend ou API REST utilizando o módulo HTTP legado (`@angular/http`).

Diferente das versões modernas do Angular (que utilizam HttpClient), o Angular 2 utiliza o serviço `Http`, que trabalha com requisições baseadas em Observables do RxJS e exige a definição explícita de cabeçalhos (`Headers`) quando enviamos dados no formato JSON.

### 1. Passo a Passo para o Envio via HTTP POST

1. **Importação dos Módulos**: Certifique-se de que o `HttpModule` está importado no seu `AppModule` junto com o `FormsModule`.
2. **Injeção de Dependência**: Injeção do serviço `Http` no construtor da classe do componente.
3. **Validação e Preparação**: No método de submissão (`onSubmit`), verifique se `form.valid` é verdadeiro.
4. **Requisição POST**: Envie os dados convertidos em string JSON acompanhados dos cabeçalhos HTTP adequados.
5. **Inscrição (`subscribe`)**: Como os Observables são lazy (preguiçosos), a requisição HTTP só é disparada de fato quando você chama o `.subscribe()`.

### 2. Exemplo Prático Completo

O Componente (`enviar-form.component.ts`)

```TypeScript
import { Component } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map'; // Operador map para converter a resposta

@Component({
  selector: 'app-enviar-form',
  template: `
    <div style="margin: 20px; font-family: sans-serif;">
      <h2>Submetendo Formulário com HTTP POST (Angular 2)</h2>

      <!-- Exibindo feedback de envio -->
      <div *ngIf="enviando" style="color: blue; margin-bottom: 10px;">
        Enviando dados para o servidor...
      </div>
      <div *ngIf="sucesso" style="color: green; margin-bottom: 10px;">
        ✅ Dados salvos com sucesso pelo servidor!
      </div>

      <form #f="ngForm" (ngSubmit)="onSubmit(f)" *ngIf="!sucesso">
        
        <div style="margin-bottom: 15px;">
          <label>Nome do Usuário:</label><br>
          <input 
            type="text" 
            name="nome" 
            [(ngModel)]="usuario.nome" 
            required 
            minlength="3" 
            #nomeInput="ngModel" />
        </div>

        <div style="margin-bottom: 15px;">
          <label>E-mail:</label><br>
          <input 
            type="email" 
            name="email" 
            [(ngModel)]="usuario.email" 
            required 
            email 
            #emailInput="ngModel" />
        </div>

        <button type="submit" [disabled]="!f.valid || enviando" style="padding: 8px 15px;">
          {{ enviando ? 'Enviando...' : 'Cadastrar no Servidor' }}
        </button>
      </form>
    </div>
  `
})
export class EnviarFormComponent {
  usuario = {
    nome: '',
    email: ''
  };

  enviando: boolean = false;
  sucesso: boolean = false;

  // Injetando o Http do Angular 2 legado
  constructor(private http: Http) {}

  onSubmit(form: any) {
    if (form.valid) {
      this.enviando = true;

      // 1. Definindo os cabeçalhos HTTP (Headers) informando que o conteúdo é JSON
      const headers = new Headers({ 'Content-Type': 'application/json' });
      const options = new RequestOptions({ headers: headers });

      // 2. Endpoint da API (exemplo simulado com JSONPlaceholder)
      const urlApi = 'https://jsonplaceholder.typicode.com/users';

      // 3. Convertendo o objeto do formulário (form.value) para string JSON
      const corpoRequisicao = JSON.stringify(form.value);

      // 4. Disparando a requisição POST
      this.http.post(urlApi, corpoRequisicao, options)
        .map((response: Response) => response.json()) // Converte a resposta bruta para JSON
        .subscribe(
          (respostaServidor) => {
            console.log('Resposta da API:', respostaServidor);
            this.enviando = false;
            this.sucesso = true;
            form.reset(); // Limpa o formulário após o sucesso
          },
          (erro) => {
            console.error('Erro na requisição HTTP:', erro);
            this.enviando = false;
            alert('Ocorreu um erro ao enviar os dados.');
          }
        );
    }
  }
}
```

### Pontos Críticos do Módulo HTTP no Angular 2:

- **Headers Obrigatórios**: APIs REST modernas exigem o cabeçalho `Content-Type: application/json`. Sem ele, o servidor pode rejeitar o corpo da requisição ou não conseguir interpretar os dados enviados.
- **Inscrição no Observable**: O método `this.http.post(...)` retorna um Observable frio. Se você esquecer de chamar o `.subscribe()`, a requisição HTTP jamais será executada.

### URL Rest Test (Validar Requisição Post)

https://httpbin.org/get