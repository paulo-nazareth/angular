# Angular V2

## Aula 65 - Usando Guarda de Rotas: CanActivateChild

A guarda de rotas CanActivateChild no Angular é utilizada para proteger rotas filhas de um determinado componente pai.

Ela funciona de forma muito parecida com o CanActivate, mas com uma diferença crucial: enquanto o CanActivate protege apenas a rota em que é declarado, o CanActivateChild é acionado sempre que o usuário tenta navegar para qualquer sub-rota (filha) daquele grupo, sem precisar aplicar a guarda individualmente em cada filho.

### Quando usar o CanActivateChild?

- **Áreas Administrativas (`/admin`)**: Onde você tem um layout pai (`AdminComponent`) e várias páginas filhas (`/admin/usuarios`, `/admin/configuracoes`, `/admin/relatorios`). Em vez de colocar a verificação de admin em cada rota filha, você coloca uma única vez no pai.
- **Módulos com permissões específicas**: Quando um grupo de telas compartilha o mesmo nível de acesso ou restrição de role.

