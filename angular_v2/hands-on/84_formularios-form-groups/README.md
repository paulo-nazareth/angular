# Angular V2

## Aula 84 - Forms (template driven) Form groups (agrupando dados)

No ecossistema do Angular Versão 2, quando um formulário começa a crescer e lida com estruturas de dados complexas ou aninhadas (como dados de endereço, informações de pagamento ou perfis de usuário), manter todas as propriedades em um único nível plano pode desorganizar o modelo de dados. É aí que entra a diretiva `ngModelGroup` em formulários Template-Driven.

O `ngModelGroup` permite que você crie subgrupos lógicos de controles dentro do seu `ngForm`, gerando um objeto aninhado no valor final do formulário e permitindo monitorar o estado de validação de seções específicas de forma isolada.

### Para que serve o `ngModelGroup`?

1. **Organização de Dados (JSON Aninhado)**: Em vez de enviar propriedades planas como cep, rua e cidade, o formulário produz automaticamente um objeto estruturado:

```JSON
{
  "nome": "João",
  "endereco": {
    "cep": "01001-000",
    "rua": "Praça da Sé"
  }
}
```

2. **Validação por Seção**: Você pode exportar a referência do grupo (ex: `#enderecoGroup="ngModelGroup"`) para verificar se apenas aquela seção específica do formulário é válida (`enderecoGroup.valid`).
3. **Escopo de Estilos**: Facilita a aplicação de regras visuais ou mensagens de erro focadas em um bloco específico de campos.
