
## Sou Odonto - Teste
 

Este é um projeto de desafio fullstack para criar uma página onde um professor de odontologia possa montar uma lista de compras para seus alunos do próximo semestre.

  

A página precisa ter:

  

* A lista de materiais (imagem do produto, nome do produto, marca, quantidade, obrigatório [sim ou não])

* A opção de adicionar um novo produto nessa lista

  

## Como Rodar o Projeto

  

Siga as instruções abaixo para executar o projeto em seu ambiente local:

  

1. Clone o repositório do projeto em sua máquina local:

```bash
git clone https://github.com/CarlosEduardoPereiraMarques/sou-odonto-teste.git
```

2. Em seguida abra a pasta com o seu editor de código, como por exemplo o Visual Studio Code.

3. Abra o terminal e execute o comando:

```powershell
# Instalar as dependências de projeto
npm install 
# Iniciar o servidor local
npm run dev
```

4. Isso fará com que todas as dependências sejam instaladas e o servidor local irá abrir na rota http://localhost:3000

  

O projeto pode ser acessado pelo link:
 https://sou-odonto-teste-338pzcapj-carloseduardopereiramarques.vercel.app

  

### Banco de dados

Para o projeto decidi usar o MongoDB, abaixo está uma descrição das coleções e seus respectivos campos, juntamente com seus tipos de dados.  

###### Coleção: users
Essa coleção contém os dados de informação sobre o usuário, que servirão de base para vincular as próximas coleções e gerir as permissões de adição, edição e exclusão das listas de compras

  

```json
{
	"_id": "RandomObjectID",
	"name": "Usuário Exemplo",
	"cpf": "99999999999",
	"email": "exemplo@exemplo.com",
	"password": "Exemplo",
	"__v": 0
}
``` 

* _id: ID do objeto (identificador único gerado automaticamente para o documento).
* name: Nome do usuário (String).
* cpf: CPF do usuário (String).
* email: Endereço de e-mail do usuário (String).
* password: Senha do usuário criptografada (String).
* __v: Chave de versão (usada pelo MongoDB para controle de versão).  
___
###### Coleção: buylistdata
Essa coleção contém os dados das listas de compras criadas pelo usuário, onde o campo user_id vincula àquelas informações ao usuário.   

```json

{
	"_id": "RandomObjectID",
	"user_id": "RandomObjectIDFromUserCollection",
	"name": "Lista de Exemplo",
	"description": "Descrição de Exemplo",
	"__v": 0
}

``` 

* _id: ID do objeto (identificador único gerado automaticamente para o documento).
* user_id: ID do usuário (String) associado à lista de compras.
* name: Nome da lista de compras (String).
* description: Descrição da lista de compras (String).
* __v: Chave de versão (usada pelo MongoDB para controle de versão).  
___
###### Coleção: products
Essa coleção contém os dados do produto para exibi-lo na busca, página da categoria e do produto. 
```json

{
	"_id": "RandomObjectID",
	"id": 1,
	"name": "Produto Exemplo",
	"price": 99.99,
	"manufacturer": "Fabricante Exemplo",
	"category": "exemplo",
	"img": "link-para-a-imagem",
	"__v": 0
}

```

* _id: ID do objeto (identificador único gerado automaticamente para o documento).
* id: ID do produto (Int32).
* name: Nome do produto (String).
* price: Preço do produto (Double).
* manufacturer: Nome do fabricante (String).
* category: Categoria do produto (String).
* img: URL da imagem do produto (String).
* __v: Chave de versão (usada pelo MongoDB para controle de versão).
 ___

###### Coleção: buylistproducts  
Essa coleção contém os dados do produto dentro da lista de compras do usuário, os campos user_id e list_id vinculam ao usuário e àquela lista de compras em específico.
```json
{
	"_id": "RandomObjectID",
	"user_id": "RandomObjectIDFromUserCollection",
	"list_id": "RandomObjectIDFromBuylistCollection",
	"product_id": 1,
	"amount": 1,
	"obligatory_item": false
}
``` 

* _id: ID do objeto (identificador único gerado automaticamente para o documento).
* user_id: ID do usuário (String) associado à lista de compras.
* list_id: ID da lista de compras (String) associada à lista de compras.
* product_id: ID do produto (Int32) associado à lista de compras.
* amount: Quantidade do produto na lista de compras (Int32).
* obligatory_item: Valor booleano que indica se o produto é obrigatório na lista de compras.
