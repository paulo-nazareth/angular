# Angular V2

## Aula 63 - Rotas: Tela de Login e como não mostrar o Menu (NavBar)

Para criação do autenticação criaremos um novo serviço, chamado `AuthService`, através do comando:

```bash
# Criação do Service AuthService
ng g s login/auth
```

Declarado no `app.module.ts`, para viabilizar a injeção de dependência.

Também foi realizado a criação de um objeto Usuario, manualmente (`login/usuario.ts`).

```TypeScript
export class Usuario {
    nome: string;
    senha: string;
}
```