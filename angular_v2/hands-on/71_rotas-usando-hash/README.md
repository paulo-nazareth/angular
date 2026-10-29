# Angular V2

## Aula 71 - Estilo de URL: HTML5 ou usando #

No ecossistema do Angular Versão 2, o roteador (`@angular/router`) oferece duas estratégias diferentes para gerenciar o formato das URLs no navegador: o uso de Hash (#) (conhecido como *HashLocationStrategy*) e o padrão **HTML5** (conhecido como *PathLocationStrategy*).

Essa configuração define como o roteador lê e escreve os caminhos na barra de endereços do navegador.

### 1. Estratégia Baseada em Hash (#) — HashLocationStrategy

Nesta abordagem, as rotas são precedidas por um caractere de cerquilha (`#`). Tudo o que vem após o `#` é tratado pelo roteador do Angular, enquanto o que vem antes é tratado pelo servidor web.

- **Exemplo de URL**: [http://meusite.com/#/home](http://meusite.com/#/home) ou [http://meusite.com/#/sobre](http://meusite.com/#/sobre)
- **Como funciona**: Quando o usuário navega ou atualiza a página (F5), o navegador envia ao servidor apenas a parte anterior ao `#` (ou seja, [http://meusite.com/](http://meusite.com/)). O servidor sempre responde com o arquivo `index.html` base, e o Angular assume o controle e renderiza a rota correta baseada no hash.
- **Vantagem Principal**: *Não exige configuração no servidor web*. Funciona perfeitamente em qualquer hospedagem estática básica (como Apache, Nginx, GitHub Pages ou servidores FTP simples) sem que o servidor precise saber lidar com rotas do Angular.

### Como habilitar o Hash no Angular 2:

Para ativar a estratégia de hash, você deve importar o provedor `HashLocationStrategy` e configurá-lo ao instanciar o roteador no módulo raiz (`app.module.ts` ou arquivo de rotas):

```TypeScript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes, LocationStrategy, HashLocationStrategy } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [ BrowserModule, RouterModule.forRoot(routes) ],
  declarations: [ AppComponent, HomeComponent ],
  providers: [
    // Força o uso do estilo de URL com # (Hash)
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```
