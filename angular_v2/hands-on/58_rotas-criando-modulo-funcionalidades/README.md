# Angular V2

## Aula 58 - Criando um Módulo de Funcionalidade

No Angular, o objetivo principal de criar um Módulo de Funcionalidade (Feature Module — normalmente usando o decorator `@NgModule`) é organizar a aplicação em blocos coesos de código focados em uma funcionalidade específica, domínio de negócio ou fluxo de tela, em vez de jogar tudo no `AppModule` raiz.

Essa abordagem traz vantagens arquiteturais fundamentais para o desenvolvimento:

### Principais Objetivos e Benefícios

- **Organização e Separação de Responsabilidades**: Permite agrupar componentes, diretivas, pipes e serviços que trabalham juntos para um mesmo objetivo (por exemplo, um `ClienteModule`, `RelatorioModule` ou `CheckoutModule`). Isso mantém a base de código limpa e navegável.
- **Carregamento sob Demanda (Lazy Loading)**: Módulos de funcionalidade são os candidatos ideais para serem carregados de forma assíncrona (`loadChildren`). A aplicação só baixa o código daquele módulo quando o usuário navega para a rota correspondente, reduzindo drasticamente o tempo de carregamento inicial (bundle size).
- **Reutilização de Código**: Um módulo de funcionalidade bem isolado pode ser facilmente desacoplado e reutilizado em outros projetos ou em diferentes partes da mesma aplicação.
- **Encapsulamento e Clareza de Escopo**: Com o uso de `declarations`, `imports`, `exports` e `providers`, você controla explicitamente o que pertence àquele contexto e o que fica visível ou oculto para o resto da aplicação.

### Boas Práticas na Estruturação

- **Módulos de Roteamento Dedicados**: Geralmente, cada módulo de funcionalidade possui seu próprio arquivo de rotas associado (ex: `cliente-routing.module.ts`), mantendo as regras de navegação organizadas junto ao seu respectivo domínio.
- **Evitar Módulos Gigantes**: O `AppModule` deve ficar enxuto, servindo apenas para inicializar a aplicação e registrar os módulos globais (como `BrowserModule` e o roteador raiz). Toda regra de negócio específica deve ser isolada em módulos próprios.

        O `BrowserModule` só pode ser declarado no `app.module.ts`, nos demais módulos é declarado o `CommonModule`.