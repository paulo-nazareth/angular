# Angular V2

## Aula 86 - Forms (template driven) Populando Campos com setValue e patchValue (CEP)

No ecossistema do Angular Versão 2, embora os formulários **Template-Driven** sejam fortemente baseados em Two-Way Data Binding (`[(ngModel)]`), por baixo dos panos o Angular gerencia uma árvore de controles (`FormGroup` e `FormControl`).

Isso significa que você pode acessar a instância subjacente do formulário através da referência do `ngForm` (ex: `f.form`) e utilizar métodos programáticos como `patchValue` e `setValue` para popular dados, como no caso do preenchimento automático via CEP.

### A Diferença entre `patchValue` e `setValue`

| Método | Como Funciona | Quando Utilizar |
| :--- | :--- | :--- |
| `patchValue()` | "Atualiza apenas as propriedades específicas que você passar no objeto, ignorando o restante." | "Ideal para preenchimentos parciais (ex: preencher rua, bairro e cidade após consultar um CEP)." |
| `setValue()` | "Exige que você informe a estrutura completa de todos os campos do formulário de uma só vez. Se faltar qualquer campo, o Angular dispara um erro no console." | Útil quando você está carregando o registro completo de um usuário para edição. |

### Exemplo Prático: Utilizando `patchValue` na Consulta de CEP

No exemplo anterior, atualizamos o objeto diretamente (`this.usuario.endereco.rua = ...`). Com o `patchValue` aplicado ao `ngForm`, podemos atualizar o grupo de endereço de forma limpa e integrada ao motor de controle do Angular.

O Componente (`consulta-patch.component.ts`)

```TypeScript
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-consulta-patch',
  template: `
    <div style="margin: 20px; font-family: sans-serif;">
      <h2>Populando Dados com patchValue (Template-Driven)</h2>

      <!-- Passamos a referência 'f' do ngForm para o método -->
      <form #f="ngForm" (ngSubmit)="onSubmit(f)">
        
        <fieldset style="border: 1px solid #ccc; padding: 15px; margin-bottom: 15px;" ngModelGroup="endereco">
          <legend><strong>Endereço</strong></legend>
          
          <div style="margin-bottom: 10px;">
            <label>CEP:</label><br>
            <input 
              type="text" 
              name="cep" 
              [(ngModel)]="usuario.endereco.cep" 
              required 
              maxlength="8"
              (blur)="consultarCep(usuario.endereco.cep, f)" />
          </div>

          <div style="margin-bottom: 10px;">
            <label>Logradouro / Rua:</label><br>
            <input type="text" name="rua" [(ngModel)]="usuario.endereco.rua" required />
          </div>

          <div style="margin-bottom: 10px;">
            <label>Bairro:</label><br>
            <input type="text" name="bairro" [(ngModel)]="usuario.endereco.bairro" required />
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

        <button type="submit" [disabled]="!f.valid">Salvar</button>
      </form>
    </div>
  `
})
export class ConsultaPatchComponent {
  usuario = {
    endereco: { cep: '', rua: '', bairro: '', cidade: '', estado: '' }
  };

  constructor(private http: Http) {}

  consultarCep(cep: string, form: any) {
    const cepLimpo = cep ? cep.replace(/\D/g, '') : '';

    if (cepLimpo.length === 8) {
      this.http.get(`https://viacep.com.br/ws/${cepLimpo}/json/`)
        .map(response => response.json())
        .subscribe(dados => {
          if (!dados.erro) {
            // USANDO PATCHVALUE: Atualiza apenas o subgrupo 'endereco' de forma programática
            form.form.patchValue({
              endereco: {
                rua: dados.logradouro,
                bairro: dados.bairro,
                cidade: dados.localidade,
                estado: dados.uf
              }
            });
          } else {
            alert('CEP não encontrado.');
          }
        });
    }
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Enviado:', form.value);
    }
  }
}
```

### Por que usar `patchValue` com o `ngForm`?

- **Sincronização de Estado**: Atualizar via `f.form.patchValue()` garante que o Angular reconheça que os campos foram modificados programaticamente, atualizando automaticamente os estados de validação (`ng-dirty`, `ng-valid`) e o objeto `f.value`.
- **Organização**: Permite injetar dados aninhados respeitando a estrutura do `ngModelGroup` (`endereco: { ... }`) sem precisar acessar propriedades profundas da classe manualmente uma a uma.