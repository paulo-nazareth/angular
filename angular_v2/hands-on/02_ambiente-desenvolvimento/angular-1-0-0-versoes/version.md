## Configuração Angular Legado

Usar um Node.js anterior à versão 6.x trará mais problemas de compatibilidade do que soluções, mesmo se o seu objetivo for replicar o cenário exato da época.

A recomendação é utilizar o **Node.js v8.9.4**.

https://nodejs.org/download/release/v8.9.4

#### Por que NÃO usar o Node.js menor que 6.0?

- **Falta de recursos do ES6**: O Angular 2 foi construído usando o ecossistema moderno do JavaScript. O Node.js v4 e v5 não possuem suporte nativo a várias sintaxes do ES6 que os scripts de build do projeto (Webpack, SystemJS ou Gulp) precisam para rodar.
- **Incompatibilidade do NPM**: Versões muito antigas do Node trazem o NPM v2 ou v3. Esses gerenciadores sofrem com o "inferno das dependências aninhadas" (pastas node_modules infinitamente longas), o que frequentemente estoura o limite de caracteres de caminhos no Windows e quebra a instalação de pacotes do Angular 2.O 
- **Node 6 era o padrão da época**: O Angular 2 Final foi lançado em setembro de 2016. O Node.js 6 (Boron) foi lançado em abril de 2016 e virou a versão LTS oficial exatamente no mesmo período do Angular 2. Portanto, o ambiente de referência histórica mais fiel é justamente o Node.js 6.x.

### Dependências Core (Angular e Aliados)

Essas versões são estritamente casadas com o Angular 2.4.x:

- **TypeScript**: `~2.0.10` ou `~2.1.0`. (O Angular 2 não compila com TypeScript 2.4+ ou 3.x).
- **RxJS**: `^5.0.1` (O padrão do Angular 2. Não use a v6 ou superior).
- **Zone.js**: `^0.7.2` ou `^0.8.4` (Essencial para a detecção de mudanças do Angular 2).
- **Core-js**: `^2.4.1` (Responsável pelos polyfills para navegadores).

### Bibliotecas de Estilo Legadas (Bootstrap e jQuery)

Na época do Angular 2, o Bootstrap 4 ainda estava em versão Alpha/Beta, e o Bootstrap 3 era o padrão de mercado. O ecossistema usava muito jQuery para os componentes visuais:

- **Bootstrap**: `^3.3.7` (Se quiser a versão original da época) ou `^4.0.0-alpha.6` (Se o projeto já usava o início do Bootstrap 4).
- **jQuery**: `^3.1.1` (Necessário se for usar o Bootstrap 3 JavaScript nativo).
- **NGX-Bootstrap** (Opcional): `^1.6.6` (Se você não quiser usar jQuery e preferir os componentes Bootstrap reescritos nativamente para Angular 2).

### Ferramentas de Build e Teste (DevDependencies)

O `angular-cli@1.0.0-beta.28.3` gerencia o Webpack por baixo dos panos, mas ele exige essas versões de suporte:

- **@types/node**: `~6.0.60` (Garante que os tipos do Node mapeiem corretamente no TypeScript 2.x).
- **@types/jasmine**: `~2.5.38` (Para os testes unitários da época).
- **Karma**: **~1.4.1** (Executor de testes).
- **Protractor**: `~5.1.0` (Para testes de ponta a ponta / E2E).

#### Exemplo de Estrutura do package.json Ideal

```json
"dependencies": {
  "@angular/common": "^2.4.10",
  "@angular/compiler": "^2.4.10",
  "@angular/core": "^2.4.10",
  "@angular/forms": "^2.4.10",
  "@angular/http": "^2.4.10",
  "@angular/platform-browser": "^2.4.10",
  "@angular/platform-browser-dynamic": "^2.4.10",
  "@angular/router": "^3.4.10",
  "core-js": "^2.4.1",
  "rxjs": "^5.0.1",
  "zone.js": "^0.7.4",
  "bootstrap": "^3.3.7",
  "jquery": "^3.1.1"
},
"devDependencies": {
  "angular-cli": "1.0.0-beta.28.3",
  "typescript": "~2.0.10",
  "@types/node": "~6.0.60",
  "karma": "~1.4.1",
  "protractor": "~5.1.0"
}

```

Todas as dependências e respectivas versões instaladas através do comando:

Aqui está a sequência exata de comandos que você deve executar no seu terminal para limpar o ambiente atual, configurar o Node 6.17 e instalar todas as dependências corretas para o Angular v2.

Execute os comandos na ordem listada:

### 1. Limpeza do Ambiente Atual

Se você já tentou instalar antes, limpe os resíduos para evitar conflitos de cache e versões órfãs:

```bash
# Remove pastas e travas de instalações antigas do diretório do projeto
rm -rf node_modules package-lock.json

# Limpa o cache do NPM de forma forçada (obrigatório para o Node 6)
npm cache clean --force
```

### 2. Desinstalar o CLI Moderno (Global)

Garanta que nenhuma versão moderna do Angular CLI interfira no comando `ng`:

```bash
npm uninstall -g @angular/cli
```

### 3. Instalar o Angular CLI da Época (Global)

Instale a versão do CLI puramente compatível com o ecossistema do Angular 2:

```bash
npm install -g angular-cli@1.0.0-beta.28.3
```

### 4. Forçar as Versões Corretas no Projeto (Local)

Execute estes comandos dentro da pasta do seu projeto para salvar as versões exatas e compatíveis no seu `package.json`:

As dependências de execução (Core, RxJS, Bootstrap e jQuery):

```bash
npm install --save --save-exact @angular/common@2.4.10 @angular/compiler@2.4.10 @angular/core@2.4.10 @angular/forms@2.4.10 @angular/http@2.4.10 @angular/platform-browser@2.4.10 @angular/platform-browser-dynamic@2.4.10 @angular/router@3.4.10 core-js@2.4.1 rxjs@5.0.1 zone.js@0.7.4 bootstrap@3.3.7 jquery@3.1.1
```

As dependências de desenvolvimento (TypeScript e compiladores):

```bash
npm install --save-dev --save-exact angular-cli@1.0.0-beta.28.3 typescript@2.0.10 @types/node@6.0.60 karma@1.4.1 protractor@5.1.0
```

## Apresentou Erro (Type expected.)

```bash
C:/_develop/app/angular/angular_v2/hands-on/servicos/node_modules/@types/selenium-webdriver/index.d.ts
```

### Opções de Correção

### Solução 1: Fixar a versão antiga do Selenium WebDriver

Se o seu projeto obrigatoriamente precisar rodar testes E2E com Protractor e você não quiser ativar o `skipLibCheck`, será necessário rebaixar manualmente esses tipos para uma versão que o TypeScript 2.0 compreenda.

Execute os seguintes comandos no terminal:

```bash
# Remove a versão problemática atual
npm uninstall --save-dev @types/selenium-webdriver

# Instala a versão da época compatível com o TypeScript 2.x
npm install --save-dev --save-exact @types/selenium-webdriver@2.53.37

# Execute o servidor novamente
ng serve
```

### Solução 2: Ignorar a checagem de tipos de bibliotecas (Mais Recomendada)

A forma mais eficiente de garantir que tipos desatualizados de terceiros não quebrem o build é instruir o compilador do TypeScript a ignorar os arquivos `.d.ts` de dentro da pasta `node_modules`.

1. Abra o arquivo `tsconfig.json` na raiz do seu projeto.
2. Dentro do objeto "compilerOptions", adicione a propriedade "skipLibCheck": `true`.
3. O arquivo deve ficar estruturado assim:
    ```json
    {
    "compilerOptions": {
        "skipLibCheck": true,
        "target": "es5",
        "module": "commonjs",
        ...
    }
    }
    ```
4. Salve o arquivo e rode novamente o comando:
    ```bash
    ng serve
    ```

### Solução 3: Remover a pasta de testes temporariamente

Se você está apenas estudando os conceitos de serviços do Angular 2 nesta pasta (`/hands-on/servicos/`), os testes automatizados não são necessários para a aplicação funcionar.

Se as soluções acima falharem por conta de outras dependências de teste (como karma ou protractor), você pode simplesmente **deletar a pasta** `node_modules/@types/selenium-webdriver` ou remover as linhas de teste do seu `package.json` e rodar o `npm install` novamente.

## Como prosseguir com a instalação de forma segura?

Para evitar que o NPM tente buscar atualizações "escondidas" na internet que quebrem o Node 6:

1. Delete as pastas `node_modules` e o arquivo `package-lock.json` se eles existirem.
2. Altere o `package.json` com as versões acima.
3. Rode o comando `npm install --production=false` para garantir que ele respeite rigorosamente as versões declaradas.
