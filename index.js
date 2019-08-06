//Importar o Express - Require(Nome da Dependência)
const express = require("express");
//Iniciar a aplicação e receber o Express() **Express exporta função*
const app = express();

app.use(express.json());

const projects = [
  {
    id: "0",
    title: "Novo projeto",
    tasks: ["Nova tarefa"]
  }
];
//Pegar informação de um ID,
//Req: Requisição
//Res: Retornar resposta
app.get("/projects/:index", (req, res) => {
  const { index } = req.params;

  return res.json(projects[index]);
});
//Pegar informação de todo o Array projects
app.get("/projects", (req, res) => {
  return res.json(projects);
});
//Adicionar novo ID e nome de projeto
app.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(projects);
});
//Desginar a porta para a variável APP declarada no inicio do código
app.listen(3000);
