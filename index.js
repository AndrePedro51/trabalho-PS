const express = require('express');

const server = express();

server.use(express.json())

const empregados = [
    {
        id: 0,
        nome: "André Gomes",
        funcao: "Desenvolvedor",
        salario: 4500
    },
    {
        id: 1,
        nome: "Vera Gomes",
        funcao: "Merendeira",
        salario: 2500
    },
    {
        id: 2,
        nome: "Silvano Gomes",
        funcao: "Gerente geral",
        salario: 8000
    },
    {
        id: 3,
        nome: "Ariane Gomes",
        funcao: "Professora",
        salario: 4500
    }
];
server.get('/', (req, res) => {
    let tabelaEmpregados = '';
    empregados.forEach(empregado => {
        tabelaEmpregados += `<tr>
        <td>${empregado.id}</td>
        <td>${empregado.nome}</td>
        <td>${empregado.funcao}</td>
        <td>${empregado.salario}</td>
    </tr>
    `
  })
  return res.send( 
    `<!DOCTYPE html>
    <html>
        <body style="text-align: center">
    
        <h1>Trabalho Programação Script!</h1>
        <h1>Lista de funcionários</h1> 
        <table border="1" style="margin: auto">
            <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Função</th>
                <th>Salário</th>
            </tr>
            ${tabelaEmpregados}
        </table>
        </body>
    </html> `
  );
})

server.get("/:id", (req, res) => {
  const { id } = req.params;
  let colaborador = empregados.filter(empregado => empregado.id == id)
  return res.send(
    `<!DOCTYPE html>
    <html>
      <body style="text-align: center">
        <title>T1 - PS</title>
        <h1> Trabalho - Programação Script</h1>
        <h3> Segue abaixo o usuário específico a ser filtrado</h3>
        <table border="1" style="margin: auto">
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Função</th>
            <th>Salário</th>
          </tr>
          <tr>
            <td>${id}</td>
            <td>${colaborador[0].nome}</td>
            <td>${colaborador[0].funcao}</td>
            <td>${colaborador[0].salario}</td>
          </tr>
        </table>
      </body>
    </html> `
  )
})

server.post("/adicionar",(req, res) => {
  const { nome, salario, funcao } = req.body;
  let id = empregados[empregados.length-1].id + 1
  let novoEmpregado = {
    id,
    nome,
    salario,
    funcao
  }
  empregados.push(novoEmpregado);

  return res.json(empregados)
});

server.put("/alterar/:index", (req, res) => {
  const { index } = req.params;
  const { nome, salario, funcao } = req.body;

  empregados[index].nome = nome;
  empregados[index].salario = salario;
  empregados[index].funcao = funcao;

  return res.json(empregados);
});

server.delete("/delete/:index", (req, res) => {
  const { index } = req.params;
  empregados.splice(index, 1);
  return res.json(empregados);
});


server.listen(3000);