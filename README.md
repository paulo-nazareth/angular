# Angular

Repositorio Angular, contendo as anotações das aulas e respectivo código fonte apresentado no curso de Angular gratuito do blog loiane.com - loiane.training e aprendizado adiquirido a cada aula/vídeo.

### Temas Abordados

1. Introdução
2. Componentes e Templates
3. Data binding
4. Diretivas
5. Serviços
6. Formulários
7. Roteamento
8. Integração com servidor
9. CRUD Metre-Detalhe

### Como navegar

Acesse a versão do angular desejada clicando sobre angula_vX, acesse [/aulas](angular_v2/aulas/README.md) e abra o [README](angular_v2/aulas/README.md). 
Será apresentado o Índice das Aulas e resumo do conteúdo, permitindo navegar para a aula desejada /aula_YY/README.md...

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
