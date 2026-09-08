# Angular V2

## Aula 51 - Rotas: RouterLink: Definindo Rotas no Template

### Definindo Rotas no Template (app.component.html)

`routerLink`: Diretiva usada nas tags `<a>` ou botões para navegar entre rotas sem disparar o recarregamento da página.

```HTML
<nav>
  <div class="nav-wrapper">
    <!-- Use routerLink em vez de href para evitar o reload da página -->
    <a routerLink="" class="brand-logo right">{{title}}</a>
    <ul id="nav-mobile" class="left hide-on-med-and-down">
      <li><a routerLink="/login">Login</a></li>
      <li><a routerLink="/cursos">Cursos</a></li>
    </ul>
  </div>
</nav>

<!-- O componente da rota correspondente será renderizado aqui -->
<main>
  <router-outlet></router-outlet>
</main>
```

    **Nota**: A diretiva `routerLinkActive="nome-da-classe"` adiciona automaticamente uma classe CSS ao elemento quando a rota dele estiver ativa.
