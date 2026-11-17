# Angular

Repositorio Angular, contendo as anotações das aulas e respectivo código fonte apresentado no curso de Angular gratuito do blog loiane.com - loiane.training e aprendizado adiquirido a cada aula/vídeo.

### Temas Abordados

1. Introdução
2. Data binding
3. Componentes e Templates
4. Diretivas
5. Serviços
6. Roteamento
7. Formulários
8. Integração com servidor
9. CRUD Metre-Detalhe

### Como navegar

Acesse a versão do angular desejada clicando sobre angula_vX, acesse [/hands-on](angular_v2/hands-on/README.md) e abra o [README](angular_v2/hands-on/README.md). 
Será apresentado o Índice das Aulas e resumo do conteúdo, permitindo navegar para a aula desejada /hands-on_YY/README.md...

Além do conteúdo apresentado para cada aula, realizei anotações do estudo de forma complementar, para reforçar o entendimento, contemplando também a história e informações a cerca da utilização, detalhes da documentação e boas práticas.

## O que é Angular

É um framework de desenvolvimento front-end de código aberto criado e mantido pelo Google. Ele serve para construir aplicações web modernas, focando em Single Page Applications (SPAs), onde a página não precisa ser recarregada inteira a cada clique do usuário.

O Angular tem uma história bem marcante porque ele mudou completamente o jeito que a gente desenvolve para a web, e a finalidade dele hoje é resolver a vida de grandes projetos.

Tudo começou ali por 2009 com o AngularJS. Na época, fazer sites dinâmicos dava um trabalho absurdo. O AngularJS estourou porque ele conseguia sincronizar o que o usuário digitava na tela com o código quase que magicamente. O problema é que a web evoluiu muito rápido. Os sites viraram sistemas gigantescos, e o AngularJS começou a ficar pesado e lento. Em 2016, a equipe do Google tomou uma decisão super radical: em vez de tentar consertar o antigo, eles jogaram tudo fora e refizeram o framework absolutamente do zero. Foi aí que nasceu o Angular (sem o "JS"), que passou a usar o TypeScript e mudou a forma de organizar o código por componentes. No começo a comunidade tomou um susto porque o código antigo não servia no novo, mas foi a melhor decisão para o futuro da tecnologia.

A grande finalidade do Angular hoje no mercado é ser uma solução completa e robusta para sistemas complexos. Sabe quando você entra em um sistema de um banco, de uma grande companhia aérea ou de uma multinacional? Esses sistemas têm centenas de telas, painéis, gráficos e formulários gigantescos. O Angular serve perfeitamente para isso. Ele foca em criar Single Page Applications, que são aqueles sites que carregam uma vez só e parecem um aplicativo de celular, onde tudo abre instantaneamente sem aquela tela branca de carregamento. O grande trunfo dele no desenvolvimento é a padronização: ele já vem com rotas, validação de formulários e segurança de fábrica. Isso faz com que uma equipe de 50 programadores consiga trabalhar junta sem que um estrague o código do outro, garantindo que o sistema continue funcionando perfeitamente por anos.

O Angular nasceu da necessidade de criar aplicações web mais complexas e eficientes, evoluindo de uma ferramenta simples para um ecossistema corporativo completo.

### A História do Angular

O framework passou por uma grande evolução dividida em duas eras principais:

- **O Início (AngularJS - 2009/2010)**: Criado por Miško Hevery e Adam Abrons, nasceu como um projeto pessoal chamado AngularJS (versão 1.x). O Google o comprou e o lançou oficialmente em 2010. Ele revolucionou o mercado ao introduzir o Two-Way Data Binding (sincronização automática entre o código e a tela).
- **A Grande Crise e Reescrita (Angular 2 - 2016)**: Com o surgimento de concorrentes como o React, o AngularJS começou a apresentar problemas de desempenho em páginas gigantes. Em vez de apenas atualizar o sistema, o Google decidiu reescrever o framework do zero.
- **A Mudança de Nome**: A nova versão abandonou o "JS" do nome, passando a se chamar apenas Angular (versão 2 ou superior). Ela adotou o TypeScript como linguagem padrão e mudou o foco para componentes.
- **Ciclo Atual**: Hoje, o Angular está em constantes atualizações semestrais, trazendo recursos modernos como Signals para melhorar a reatividade e o desempenho.

### A Finalidade no Âmbito de Desenvolvimento

A principal finalidade do Angular é padronizar e acelerar a criação de aplicações web complexas de nível corporativo. Ele foi desenhado para resolver os problemas de grandes equipes de programação.

- **Aplicações de Página Única (SPAs)**: Criar sites onde o usuário navega por diferentes páginas sem que o navegador precise recarregar do zero a cada clique.
- **Aplicações Web Progressivas (PWAs)**: Facilitar a criação de sistemas web que funcionam de forma parecida com aplicativos de celular, inclusive offline.
- **Sistemas Corporativos (Enterprise)**: É a escolha favorita de bancos, governos e grandes empresas porque sua estrutura rígida garante que 100 programadores consigam trabalhar no mesmo projeto seguindo o mesmo padrão de código.
- **Manutenibilidade a Longo Prazo**: Como o Angular define exatamente onde cada arquivo, rota e serviço deve ficar, fica muito mais fácil dar manutenção em um sistema mesmo anos após a sua criação.

### Principais Características

- **TypeScript**: É construído usando TypeScript, uma linguagem baseada em JavaScript que traz mais segurança e organização ao código.
- **Componentes**: Usa uma estrutura baseada em blocos independentes e reutilizáveis chamados componentes (que juntam HTML, estilos e lógica).
- **Ferramentas completas**: Já vem com soluções prontas para gerenciar rotas, formulários e a comunicação com servidores.

### Principais Mudanças do Angular 2

O Angular 2 é uma reescrita completa do antigo AngularJS (Angular 1) criado pelo Google, focando em componentes e uso de [TypeScript]. Suas bases principais são a arquitetura baseada em componentes, a troca de JavaScript por TypeScript e o abandono total da compatibilidade direta com a primeira versão (AngularJS)

- **TypeScript**: Uso obrigatório ou principal para escrever códigos com tipagem estática.
- **Componentes**: Troca dos antigos controladores por blocos visuais chamados componentes.
- **Desempenho**: Mudança na detecção de mudanças e renderização mais rápida na tela.

O Angular 2 e suas versões posteriores utilizam os padrões da web modernos para criar aplicações eficientes e modulares. O framework adota o conceito de Web Components, permitindo que você crie elementos customizados e reutilizáveis no navegador.

#### Integração com Padrões Web

- **Custom Elements**: O Angular encapsula tags HTML próprias (ex: <meu-componente>) que funcionam como elementos nativos.
- **Shadow DOM**: O framework simula ou usa nativamente o isolamento de estilos para que o CSS de um componente não estrague o resto da página.
- **Templates HTML**: Uso da sintaxe `<template>` (ou *`ngIf`/*`ngFor`) para renderizar trechos de código de forma dinâmica e performática.
- **Angular Elements**: Extensão que permite exportar componentes Angular como Web Components puros para uso em qualquer página sem Angular.

### Parceria Google + Microsoft

o Angular 2 é um projeto Open Source (código aberto) sob a licença MIT e nasceu de uma colaboração muito próxima entre a Google e a Microsoft.

Embora o Angular seja mantido oficialmente pela Google, a Microsoft teve um papel fundamental no desenvolvimento da versão 2 por meio do TypeScript.

#### Detalhes dessa Parceria

- **Unificação de linguagens**: Inicialmente, a Google planejava criar sua própria linguagem (chamada AtScript), mas decidiu se unir à Microsoft para adotar e evoluir o TypeScript.
- **Ferramental**: A equipe do Angular trabalhou junto com os desenvolvedores do TypeScript para adicionar recursos necessários para o framework, como os Decorators (@Component).
- **Ecossistema Open Source**: O código é 100% público no GitHub, permitindo que qualquer programador do mundo envie melhorias e correções.

### Site Principal

https://angular.io

URL correspondente a versão 2

https://v2.angular.io/docs/ts/latest/

### Lista das aulas Curso Angular

Para visualizar a lista de aulas do tópico e ter acesso aos links, clique sobre a seta para expandir todos os items.

### 1. Introdução
<details>
    <summary><b>Introdução</b></summary>

* [01 - Introdução + Arquitetura](angular_v2/hands-on/01_introducao_arquitetura/README.md)
* [02 - Ambiente de Desenvolvimento (Node.Js, TypeScript, Angular CLI)](angular_v2/hands-on/02_ambiente-desenvolvimento/README.md)
* [03 - Hello, World - Criando Nosso Primeiro Projeto e Primeiro Componente](angular_v2/hands-on/03_criando-primeiro-projeto/README.md)
* [04 - Introdução ao Typescript para Angular](angular_v2/hands-on/04_typescript-para-angular/README.md)
* [05 - Módulos (ngModule)](angular_v2/hands-on/05_modulos-ngModule/README.md)
* [06 - Introdução aos Templates](angular_v2/hands-on/06_templates/README.md)
* [07 - Serviços (Services) e Injeção de dependência (DI)](angular_v2/hands-on/07_servicos-injecao-dependencia/README.md)
* [08 - Dica de Produtividade: Plugins Angular, code snippets](angular_v2/hands-on/08_dicas-plugins-e-temas/README.md)

</details>

### 2. Data binding e eventos
<details>
    <summary><b>Data binding e eventos</b></summary>

* [09 - Property binding + Interpolation](angular_v2/hands-on/09_property-binding-interpolation/README.md)
* [10 - Class e Style binding](angular_v2/hands-on/10_class-style-binding-css/README.md)
* [11 - Event binding](angular_v2/hands-on/11_event-binding/README.md)
* [12 - Two-way data binding](angular_v2/hands-on/12_two-way-data-binding/README.md)
* [13 - Reusando Componente com Input Properties](angular_v2/hands-on/13_input-properties/README.md)
* [14 - Emitindo Eventos com Output Properties](angular_v2/hands-on/14_eventos-output-properties/README.md)
* [15 - Ciclo de vida (life-cycle) do Componente](angular_v2/hands-on/15_ciclo-de-vida-componente/README.md)
* [16 - Acesso ao DOM e ao Template com ViewChild](angular_v2/hands-on/16_dom-template-viewchild/README.md)
* Extra: Atualizações do RC 5 e ngModule

</details>

### 3. Componentes e Templates - Angular CLI: Introdução
<details>
    <summary><b>Angular CLI: Introdução</b></summary>

* [17 - Angular CLI: Instalação e Criação de Projetos: ng new e ng serve](angular_v2/hands-on/17_angular-cli/README.md)
* [18 - Angular CLI: Criando Components, Services: ng generate](angular_v2/hands-on/18_angular-cli-ng-generate/README.md)
* Extra: Angular CLI: atualizando para versão RC5 (webpack)
* [19 - Angular CLI: Usando pré-processadores (Sass, Less, Stylus)](angular_v2/hands-on/19_pre-processadores-sass-less-stylus/README.md)
* [20 - Angular CLI: ng lint, ng test, ng e2e](angular_v2/hands-on/20_angular-cli-ng-lint-test-e2e/README.md)
* [21 - Angular CLI: Estrutura do projeto](angular_v2/hands-on/21_estrutura-projeto-angular/README.md)
* [22 - Angular CLI: Gerando build de Produção](angular_v2/hands-on/22_gerando-build-dev-producao/README.md)
* [23 - Angular CLI: instalando bibliotecas (bootstrap, materialize, lodash, jquery, etc)](angular_v2/hands-on/23_instalando-bibliotecas/README.md)

</details>

### 4. Diretivas
<details>
    <summary><b>Diretivas</b></summary>

* [24 - Introdução e tipos de diretivas no Angular 2](angular_v2/hands-on/24_introducao-diretivas/README.md)
* [25 - Diretivas - ngIf](angular_v2/hands-on/25_diretiva-ngif/README.md)
* [26 - Diretivas - ngSwitch, ngSwitchCase e ngSwitchDefault](angular_v2/hands-on/26_diretivas-ngSwitch-ngSwitchCase/README.md)
* [27 - Diretivas - ngFor](angular_v2/hands-on/27_diretiva-ngfor/README.md)
* [28 - Diretivas - Sobre o * (Asterisco) e Template](angular_v2/hands-on/28_diretiva-asteristico-e-template/README.md)
* [29 - Diretivas - ngClass](angular_v2/hands-on/29_diretiva-ngclass/README.md)
* [30 - Diretivas - ngStyle](angular_v2/hands-on/30_diretiva-ngstyle/README.md)
* [31 - Operador Elvis ("?")](angular_v2/hands-on/31_operador-elvis/README.md)
* [32 - ng-content](angular_v2/hands-on/32_ng-content/README.md)
* [33 - Criando uma diretiva de atributo ElementRef e Renderer](angular_v2/hands-on/33_diretiva-atributo-element-ref/README.md)
* [34 - Criando uma diretiva HostListener e HostBinding](angular_v2/hands-on/34_diretiva-hostlistener-hostbinding/README.md)
* [35 - Input e Property Binding de Diretivas](angular_v2/hands-on/35_diretiva-input-property-binding/README.md)
* [36 - Criando uma diretiva de estrutura (ngElse)](angular_v2/hands-on/36_criando-diretiva-ngelse/README.md)

</details>

### 5. Serviços
<details>
    <summary><b>Serviço (Service) e Injeção de Dependência (DI)</b></summary>

* [37 - Introdução a Serviços (Services)](angular_v2/hands-on/37_introducao-services/README.md)
* [38 - Criando um Serviço (Service)](angular_v2/hands-on/38_criando-servico/README.md)
* [39 - Injeção de Dependência (DI) + Como Usar um Serviço em um Componente](angular_v2/hands-on/39_injecao-dependencia-servico/README.md)
* [40 - Escopo de Instâncias de Serviços e Módulos (Singleton e Varias Instâncias)](angular_v2/hands-on/40_escopo-instancia-modulos/README.md)
* [41 - Comunicação Entre Componentes Usando Serviços (broadcast e eventos)](angular_v2/hands-on/41_comunicacao-componentes/README.md)
* [42 - Injetando um Serviço em outro Serviço](angular_v2/hands-on/42_injecao-servico-outro-servico/README.md)

</details>

### 5.1. Pipes
<details>
    <summary><b>Pipes</b></summary>

* [43 - Pipes (usando pipes, parâmetros e pipes aninhados)](angular_v2/hands-on/43_pipes-aninhados-parametros/README.md)
* [44 - Criando um Pipe](angular_v2/hands-on/44_criando-pipe/README.md)
* [45 - Aplicando Locale (internacionalização) nos Pipes](angular_v2/hands-on/45_pipe-com-locale/README.md)
* [46 - Pipes - Criando um Pipe "Puro" (Criando um Pipe de Filtro)](angular_v2/hands-on/46_pipe-puro-filtro/README.md)
* [47 - Pipes - Criando um Pipe "Impuro"](angular_v2/hands-on/47_pipe-impuro/README.md)
* [48 - Pipes: Async](angular_v2/hands-on/48_pipe-async/README.md)

</details>

### 6. Roteamento
<details>
    <summary><b>Rotas</b></summary>

* [49 - Rotas: Introdução](angular_v2/hands-on/49_rotas-introducao/README.md)
* [50 - Rotas: Configurando Rotas Simples](angular_v2/hands-on/50_rotas-simples-configuracao/README.md)
* [51 - Rotas: RouterLink: Definindo Rotas no Template](angular_v2/hands-on/51_rotas-routerlink/README.md)
* [52 - Rotas: Aplicando CSS em Rotas Ativas](angular_v2/hands-on/52_rotas-ativa-aplicando-css/README.md)
* [53 - Rotas: Definindo e Extraindo Parâmetros de Roteamento](angular_v2/hands-on/53_rotas-extraindo-parametros/README.md)
* [54 - Rotas: Escutando Mudanças nos Parâmetros de Roteamento](angular_v2/hands-on/54_rotas-escutando-mudanca-parametro/README.md)
* [55 - Rotas Imperativas: Redirecionamento via Código](angular_v2/hands-on/55_rotas-imperativas-redirecionamento/README.md)
* [56 - Rotas: Definindo e Extraindo Parâmetros de URL (query)](angular_v2/hands-on/56_rotas-parametros-url/README.md)
* [57 - Rotas: Criando um Módulo de Rotas](angular_v2/hands-on/57_rotas-criando-modulo-rotas/README.md)
* [58 - Criando um Módulo de Funcionalidade](angular_v2/hands-on/58_rotas-criando-modulo-funcionalidades/README.md)
* [59 - Rotas: Criando um Módulo de Rotas de Funcionalidade](angular_v2/hands-on/59_rotas-criando-modulo-rota-funcionalidades/README.md)
* [60 - Rotas Filhas](angular_v2/hands-on/60_rotas-filhas/README.md)
* [61 - Rotas Filhas: Desenvolvendo as Telas](angular_v2/hands-on/61_rotas-filhas-telas/README.md)
* [62 - Rotas: Dica de Performance: Carregamento Sob Demanda (lazy loading)](angular_v2/hands-on/62_rotas-lazy-loading/README.md)
* [63 - Rotas: Tela de Login e como não mostrar o Menu (NavBar)](angular_v2/hands-on/63_rotas-tela-login/README.md)
* [64 - Usando Guarda de Rotas: CanActivate](angular_v2/hands-on/64_rotas-guard-canActivate/README.md)
* [65 - Usando Guarda de Rotas: CanActivateChild](angular_v2/hands-on/65_rotas-guard-canActivateChild/README.md)
* [66 - Usando Guarda de Rotas: CanDeactivate](angular_v2/hands-on/66_rotas-guard-canDeactivate/README.md)
* [67 - Usando Guarda de Rotas: CanDeactivate com Interface Genérica](angular_v2/hands-on/67_rotas-guard-canDeactivate-generico/README.md)
* [68 - Resolve: Carregando Dados antes da Rota ser Ativada](angular_v2/hands-on/68_rotas-resolve/README.md)
* [69 - CanLoad: Como Não Carregar a Rota/Módulo Sem Permissão](angular_v2/hands-on/69_rotas-canLoad/README.md)
* [70 - Definindo Rota Padrão e Wildcard (Rota Não Encontrada)](angular_v2/hands-on/70_rotas-wildcard/README.md)
* [71 - Estilo de URL: HTML5 ou usando #](angular_v2/hands-on/71_rotas-usando-hash/README.md)

</details>

### 7. Formulários
<details>
    <summary><b>Formulários (Templates)</b></summary>

* [72 - Formulários (template vs data / reativo) Introdução](angular_v2/hands-on/72_formularios-template-drive/README.md)
* [73 - Formulários - Criando o Projeto Inicial com Bootstrap 3](angular_v2/hands-on/73_formularios-projeto-inicial/README.md)
* [74 - Forms (template driven) Controles ngForm, ngSubmit e ngModel](angular_v2/hands-on/74_formularios-ngForm-ngSubmit-ngModel/README.md)
* [75 - Forms (template driven) Inicializando Valores com ngModel](angular_v2/hands-on/75_formularios-inicializar-valores/README.md)
* [76 - Forms (template driven) Módulos e FormsModule](angular_v2/hands-on/76_formularios-modulos-formModule/README.md)
* [77 - Forms (template driven) Aplicando Validação nos Campos](angular_v2/hands-on/77_formularios-validacao-campos/README.md)
* [78 - Forms (template driven) Aplicando CSS na Validação dos Campos](angular_v2/hands-on/78_formularios-validacao-css-campos/README.md)
* [79 - Forms (template driven) Mostrando Mensagens de Erro de Validação](angular_v2/hands-on/79_formularios-validacao-mensagem-erro/README.md)
* [80 - Forms (template driven) Desabilitando o Botão de Submit para Formulário Inválido](angular_v2/hands-on/80_formularios-desabilitando-botao/README.md)
* [81 - Forms (Dica): Verificando Dados do Form no Template com JSON](angular_v2/hands-on/81_formularios-verificando-dados-form/README.md)
* [82 - Forms (template driven) Adicionando Campos de Endereço (form layout Bootstrap 3)](angular_v2/hands-on/82_formularios-endereco-layout/)
* [83 - Forms (template driven) Refatorando (simplificando) CSS e Mensagens de Erro](angular_v2/hands-on/83_formularios-refatorar-reaproveitar/README.md)
* [84 - Forms (template driven) Form groups (agrupando dados)](angular_v2/hands-on/84_formularios-form-groups/README.md)
* [85 - Forms (template driven) Pesquisando Endereço Automaticamente com CEP](angular_v2/hands-on/85_formularios-integracao-via-cep/README.md)
* [86 - Forms (template driven) Populando Campos com setValue e patchValue (CEP)](angular_v2/hands-on/86_formularios-setValue-patchValue/README.md)
* [87 - Forms (template driven) Submetendo Valores com HTTP POST](angular_v2/hands-on/87_formularios-http-post/README.md)

</details>

### 7.1. Formulários (Reativos)
<!-- <details>
    <summary><b>Formulários (Reativos)</b></summary> -->

* [88 - Formulários Reativos (data driven) Introdução](angular_v2/hands-on/88_formularios-reativo-introducao/README.md)
* [89 - Formulários Reativos: Configuração (Módulo e Componente)](angular_v2/hands-on/89_formularios-reativo-configuracao/README.md)
* [90 - Formulários Reativos: Criando um form com Código Angular](angular_v2/hands-on/90_formularios-reativo-criando-form/README.md)
* [91 - Formulários Reativos: Sincronizando HTML com FormGroup](angular_v2/hands-on/91_formularios-reativo-html-formGroup/README.md)
* [92 - Formulários Reativos: Fazendo submit](angular_v2/hands-on/92_formularios-reativo-submit/README.md)
* [93 - Formulários Reativos: Resetando o form](angular_v2/hands-on/93_formularios-reativo-reset-form/README.md)
* [94 - Formulários Reativos: Aplicando Validação nos Campos](angular_v2/hands-on/94_formularios-reativo-validacao/README.md)
* [95 - Formulários Reativos: Acesso ao FormControl no HTML e CSS de Validação dos Campos](angular_v2/hands-on/95_formularios-reativo-formControl/README.md)
* [96 - Formulários Reativos: Endereço (Migrando de Template Driven para form reativo)](angular_v2/hands-on/96_formularios-reativo-migrando-endereco/README.md)
* [97 - Formulários Reativos: Form groups (Agrupando Dados)](angular_v2/hands-on/97_formularios-reativo-form-groups/README.md)
* [98 - Formulários Reativos: Autopopulando Endereço com CEP (setValue e patchValue)](angular_v2/hands-on/98_formularios-reativo-setValue-patchValue/README.md)
* [99 - Formulários Reativos: Verificar Validação dos Campos com Botão submit](angular_v2/hands-on/99_formularios-reativo-submit-validacao/README.md)
* [100 - Formulários: Criando um Serviço de Estados Brasileiros](angular_v2/hands-on/100_formularios-reativo-servico-estados/README.md)
* [Extra: Atualização Angular: Atualizando para Angular versão 4.4](angular_v4/hands-on/100_atualizacao-angular-v4/README.md)
* [Extra: Atualização Angular: Atualizando para Angular versão 5.2](angular_v5/hands-on/100_atualizacao-angular-v5/README.md)
* [Extra: Atualização Angular: Atualizando para Angular versão 6.1](angular_v6/hands-on/100_atualizacao-angular-v6/README.md)
* 101 - Formulários: Serviço de Consulta CEP + provideIn
* 102 - Formulários Reativos: Combobox Simples (select)
* 103 - Formulários Reativos: Combobox com Objeto (ngValue e compareWith)
* 104 - Formulários Reativos: Combobox Múltiplo (Select Multiple)
* 105 - Formulários Reativos: Radio Button (Botão do tipo Rádio)
* 106 - Formulários Reativos: Checkbox Toggle
* 107 - Formulários Reativos: FormArray: Checkboxes Dinâmicos
* 108 - Formulários Reativos: Validação Customizada (FormArray Checkboxes)
* 109 - Formulários Reativos: Validação Customizada (CEP)
* 110 - Formulários Reativos: Validação Entre Dois Campos (Confirmar email)
* 111 - Formulários Reativos: Validação Assíncrona
* 112 - Formulários Reativos: Serviço de Mensagens de Erros
* 113 - Formulários Reativos: Reagindo à Mudanças Reativamente
* 114 - Formulários Reativos: Campo input Customizado (ControlValueAcessor)
* 115 - Formulários Reativos: Classe Base para Forms (Herança no Angular)
* 116 - Formulários Reativos: Combobox Aninhado: Estado + Cidade

<!-- </details> -->

### 8. Integração com Server
<!-- <details>
    <summary><b>Integração com server</b></summary> -->

* 117 - Http / HttpClient: Introdução
* 118 - Instalando Bootstrap 4
* 119 - Http: Simulando Servidor REST (json-server)
* 120 - Http GET: listar registros
* 121 - Http: Dica: Variável de Ambiente
* 122 - Http GET + Pipe Async
* 123 - Http + RxJS: Unsubscribe Automático

<!-- </details> -->

### Link do curso:

http://loiane.training/curso/angular/

### Playlist Youtube

Clique aqui para assistir a todos os vídeos já publicados

https://www.youtube.com/playlist?list=PLGxZ4Rq3BOBoSRcKWEdQACbUCNWLczg2G

### Pré-requisitos

- HTML
- CSS
- JavaScript

### Plugins Sugeridos

- Auto Import
    - Importação e Organização de Dependências

### Link Documentação Style Guide

https://v2.angular.io/docs/ts/latest/guide/architecture.html

https://v2.angular.io/docs/ts/latest/quickstart.html
