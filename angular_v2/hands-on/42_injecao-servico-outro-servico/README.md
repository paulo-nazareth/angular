# Angular V2

## Aula 42 - Injetando um Serviço em outro Serviço

No Angular, a Injeção de Dependência permite injetar serviços dentro de outros serviços da mesma forma que fazemos nos componentes. O ponto fundamental para que isso funcione é o decorador `@Injectable()`.

Requisito Obrigatório

Para que um serviço possa receber outros serviços via construtor, ele DEVE estar decorado com `@Injectable()`. Sem o decorador `@Injectable()`, o Angular não gera os metadados necessários para identificar e injetar as dependências via construtor, lançando um erro de compilação ou execução.

**Boa prática**: Mesmo que um serviço não injete nenhum outro serviço no momento da criação, a boa prática oficial do Angular determina declarar a anotação `@Injectable()` em todos os serviços.

```bash
# Criação do Serviço LogService
ng g s shared/log
```

Exemplo Prático: Serviço de Autenticação utilizando o Serviço de Log

#### 1. O Serviço Dependência (`LogService`)

Serviço primário que será injetado em outro.

```TypeScript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  registrar(mensagem: string): void {
    console.log(`[LOG REGISTRADO]: ${mensagem}`);
  }
}
```

### 2. O Serviço Consumidor (`AuthService`)

Serviço que declara e recebe o `LogService` em seu próprio construtor.

```TypeScript
import { Injectable } from '@angular/core';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root' // Garante que este serviço também seja um Singleton gerenciado pelo sistema de DI
})
export class AuthService {

  // O Angular injeta automaticamente o LogService aqui
  constructor(private logService: LogService) {}

  login(usuario: string, senha: string): boolean {
    if (usuario === 'admin' && senha === '1234') {
      // Uso direto do serviço injetado
      this.logService.registrar(`Usuário '${usuario}' autenticado com sucesso.`);
      return true;
    }
    
    this.logService.registrar(`Tentativa de login inválida para o usuário '${usuario}'.`);
    return false;
  }
}
```

### Atenção ao Erro de Dependência Circular

Ao injetar um serviço dentro de outro, evite Dependências Circulares (por exemplo: `ServicoA` injeta `ServicoB` e o `ServicoB` também injeta o `ServicoA`).

- **O que acontece**: O Angular lança o erro Circular dependency detected.
- **Como resolver**: Extraia a lógica/estado compartilhado para um terceiro serviço intermediário que ambos possam injetar sem criar uma dependência cruzada direta.