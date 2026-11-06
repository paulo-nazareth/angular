# Angular V2

## Aula 85 - Forms (template driven) Pesquisando Endereço Automaticamente com CEP

Uma das funcionalidades mais práticas em formulários Template-Driven é o preenchimento automático de campos de endereço (como logradouro, bairro, cidade e estado) a partir de uma API externa ao digitar o CEP (por exemplo, utilizando a API pública do **ViaCEP**).

Para implementar isso em formulários baseados em template, utilizamos o evento nativo de mudança ou digitação (`ngModelChange` ou `blur`) em conjunto com um serviço HTTP do Angular (`Http` module do Angular 2) para consultar os dados e atualizar o modelo programaticamente.

### 1. Passo a Passo da Implementação

1. **Monitoramento do CEP**: Escutamos o momento em que o usuário preenche o CEP (geralmente quando o CEP atinge 8 caracteres ou quando o campo perde o foco).
2. **Consumo da API**: Fazemos uma requisição GET para o endpoint do ViaCEP (`https://viacep.com.br/ws/{cep}/json/`).
3. **Preenchimento Automático**: Ao receber a resposta, os dados retornados são injetados diretamente nas propriedades do objeto vinculado ao formulário, preenchendo os inputs instantaneamente via Two-Way Data Binding.

### 2. Exemplo Prático Completo

O Componente (`consulta-cep.component.ts`)

```TypeScript
import { Component } from '@angular/core';
import { Http } from '@angular/http'; // Módulo HTTP legado do Angular 2
import 'rxjs/add/operator/map'; // Operador map do RxJS

@Component({
  selector: 'app-consulta-cep',
  template: `
    <div style="margin: 20px; font-family: sans-serif;">
      <h2>Consulta Automática de CEP (ViaCEP no Angular 2)</h2>

      <form #f="ngForm" (ngSubmit)="onSubmit(f)">
        
        <!-- Grupo de Endereço -->
        <fieldset style="border: 1px solid #ccc; padding: 15px; margin-bottom: 15px;" ngModelGroup="endereco">
          <legend><strong>Endereço de Entrega</strong></legend>
          
          <div style="margin-bottom: 10px;">
            <label>CEP (Digite 8 números):</label><br>
            <input 
              type="text" 
              name="cep" 
              [(ngModel)]="usuario.endereco.cep" 
              required 
              maxlength="8"
              (blur)="consultarCep(usuario.endereco.cep, f)"
              #cepInput="ngModel" />
            <small style="color: #666; display: block;">O endereço será preenchido ao sair do campo (blur).</small>
          </div>

          <div style="margin-bottom: 10px;">
            <label>Logradouro / Rua:</label><br>
            <input 
              type="text" 
              name="rua" 
              [(ngModel)]="usuario.endereco.rua" 
              required />
          </div>

          <div style="margin-bottom: 10px; display: flex; gap: 10px;">
            <div>
              <label>Número:</label><br>
              <input type="text" name="numero" [(ngModel)]="usuario.endereco.numero" required style="width: 100px;" />
            </div>
            <div style="flex: 1;">
              <label>Bairro:</label><br>
              <input type="text" name="bairro" [(ngModel)]="usuario.endereco.bairro" required />
            </div>
          </div>

          <div style="margin-bottom: 10px; display: flex; gap: 10px;">
            <div style="flex: 1;">
              <label>Cidade:</label><br>
              <input type="text" name="cidade" [(ngModel)]="usuario.endereco.cidade" required />
            </div>
            <div style="width: 80px;">
              <label>Estado:</label><br>
              <input type="text" name="estado" [(ngModel)]="usuario.endereco.estado" required />
            </div>
          </div>
        </fieldset>

        <button type="submit" [disabled]="!f.valid" style="padding: 8px 15px;">
          Salvar Endereço
        </button>
      </form>
    </div>
  `
})
export class ConsultaCepComponent {
  usuario = {
    endereco: {
      cep: '',
      rua: '',
      bairro: '',
      cidade: '',
      estado: '',
      numero: ''
    }
  };

  // Injetando o Http do Angular 2
  constructor(private http: Http) {}

  consultarCep(cep: string, form: any) {
    // Remove caracteres não numéricos
    const cepLimpo = cep ? cep.replace(/\D/g, '') : '';

    if (cepLimpo.length === 8) {
      this.http.get(`https://viacep.com.br/ws/${cepLimpo}/json/`)
        .map(response => response.json())
        .subscribe(
          dados => {
            if (!dados.erro) {
              // Preenchendo os dados automaticamente no objeto do componente
              this.usuario.endereco.rua = dados.logradouro;
              this.usuario.endereco.bairro = dados.bairro;
              this.usuario.endereco.cidade = dados.localidade;
              this.usuario.endereco.estado = dados.uf;
            } else {
              alert('CEP não encontrado.');
            }
          },
          erro => {
            console.error('Erro ao consultar CEP:', erro);
          }
        );
    }
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Dados salvos:', form.value);
      alert('Endereço cadastrado com sucesso!');
    }
  }
}
```

### Pontos Importantes da Abordagem:

- **Evento `blur`**: Utilizar o evento (`blur`) garante que a requisição para a API só será disparada quando o usuário terminar de digitar o CEP e sair do campo, evitando requisições excessivas a cada tecla pressionada.
- **Módulo HTTP (`HttpModule`)**: No Angular 2 legado, as requisições AJAX eram feitas através do serviço `Http` do pacote `@angular/http`, que retornava um Observable RxJS (exigindo o uso de `.map()` e `.subscribe()`).

### URL Via CEP

[https://viacep.com.br/](https://viacep.com.br/)
