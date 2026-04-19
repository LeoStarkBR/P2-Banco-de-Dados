# BD II — Avaliacao2

Trabalho avaliativo de Banco de Dados II.  
**Banco:** Avaliacao2 | **Coleção:** Alunos | **Stack:** MongoDB + Node.js/Express

## Pré-requisitos

- [Node.js](https://nodejs.org) instalado
- MongoDB instalado e rodando na porta 27017

### Iniciar o MongoDB (se necessário)

```bash
# macOS (Homebrew)
brew services start mongodb-community

# Windows — abrir o serviço "MongoDB" no Gerenciador de Serviços
# ou executar no terminal:
mongod
```

## Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. Popular o banco com os dados do grupo e do professor
npm run seed

# 3. Iniciar o servidor
npm start

# 4. Abrir no navegador
http://localhost:3000
```

## Roteiro de prints (comprovação para o trabalho)

| Operação | Como fazer | O que aparece |
|----------|------------|---------------|
| **INSERT** | Rodar `npm run seed` no terminal | "5 documentos inseridos na coleção Alunos" |
| **SELECT** | Abrir `localhost:3000`, clicar **Buscar** | Tabela com todos os registros |
| **UPDATE** | Clicar **Editar** em qualquer linha, alterar o telefone, salvar | "Atualizado com sucesso!" |
| **DELETE** | Filtrar por "Prof" no SELECT, clicar **Excluir** no Prof. Gustavo | "Prof. Gustavo excluído com sucesso!" |

## Integrantes

- Leonardo Gabriel 
- Pegorin
- Felipe
- Murilo
- Gustavo
