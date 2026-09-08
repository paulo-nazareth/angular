# Angular V2

## Aula 52 - Rotas: Aplicando CSS em Rotas Ativas

O Materialise possui uma classe que permiter distiguir visualmente qual a navegação ativa através da `classe="active"`.

```HTML
<nav>
  <!-- Use routerLinkActive para aplicar o CSS em Rotas Ativas -->
  <a routerLink="/home" routerLinkActive="active">Início</a>
  <a routerLink="/login" routerLinkActive="active">Sobre Nós</a>
</nav>
```