# Angular V2

## Aula 45 - Aplicando Locale (internacionalização) nos Pipes

A internacionalização (i18n) nos pipes nativos do Angular (como `date`, `currency` e `number`) depende da configuração do Locale da aplicação. Por padrão, o Angular utiliza o idioma `en-US`. Para formatar valores no padrão brasileiro (`pt-BR`), é necessário registrar os dados de localização da cultura desejada no módulo principal.

### 1. Configurando o Locale Global (`pt-BR`) no AppModule

Para alterar a localização globalmente, importe a função `registerLocaleData` do pacote `@angular/common` e defina o parâmetro de provedor `LOCALE_ID`.

```TypeScript
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// 1. Importar a função de registro e os dados da localidade desejada
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

// 2. Registrar os dados do idioma no Angular
registerLocaleData(localePt);

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    // 3. Definir o LOCALE_ID padrao para a aplicacao
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 2. Utilizando os Pipes Formatados

Após registrar o `pt-BR` como o locale global, os pipes de formatação do Angular se adaptarão automaticamente às convenções brasileiras:

```HTML
<!-- Data formatada com nome do mês e dia em português -->
<p>{{ dataHoje | date:'fullDate' }}</p>
<!-- Resultado: quinta-feira, 3 de setembro de 2026 -->

<!-- Moeda utilizando o símbolo do Real (R$) -->
<p>{{ valorProduto | currency:'BRL' }}</p>
<!-- Resultado: R$ 1.250,50 -->

<!-- Número com vírgula como separador decimal e ponto nos milhares -->
<p>{{ numeroGrande | number:'1.2-2' }}</p>
<!-- Resultado: 10.000,75 -->
 ```

 ### 3. Passando o Locale Dinamicamente no Próprio Pipe

Se você precisar formatar uma data ou moeda em uma cultura diferente em apenas um ponto específico do template, sem alterar o locale global da aplicação, basta passar o código da localização como o último parâmetro do pipe.

Atenção: Os dados de localização de cada cultura utilizada devem ter sido previamente registrados no arquivo de módulo com o registerLocaleData.

```TypeScript
// Exemplo de registro para múltiplos locales no AppModule
import localeEn from '@angular/common/locales/en';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEn);
registerLocaleData(localeEs);
```

```HTML
<!-- Força a formatação de moeda em Dólar Americano (en-US) -->
<p>{{ valor | currency:'USD':'symbol':'1.2-2':'en-US' }}</p>

<!-- Força a exibição da data no idioma Espanhol (es) -->
<p>{{ dataHoje | date:'fullDate':'':'es' }}</p>
```

### Implementação no Módulo

Pode ser configurado diretamente no módulo, mas também pode ser configurada no serviço exemplo abaixo:

```TypeScript
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'//, //Padrão en-US
      //useClass: '',
      //useFactory:
    }
  ],
```

Para exemplificar o uso do Locale além da configuração no `module.ts` (comentado), também foi criado um novo service chamado `settings`.

```bash
ng g s settings
```

```TypeScript
  providers: [
    SettingsService,
    {
      provide: LOCALE_ID,
      deps: [SettingsService],
      useFactory: (settingsService: any) => settingsService.getLocale()
    }
  ],
```


