//Importar o Express - Require(Nome da Dependência)
const express = require("express");
//Iniciar a aplicação e receber o Express() **Express exporta função*
const app = express();

app.use(express.json());

const projects = [];

//Pegar informação de um ID,
//Req: Requisição
//Res: Retornar resposta

//Função verificacao ID
function verificaID(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ message: "Não tem projeto com esse ID" });
  }
  return next();
}

//Função Contagem de requisições
let contagem = 0;

function requisicao(req, res, next) {
  contagem++;
  console.log(`Requisição número ${contagem}`);

  return next();
}

app.use(requisicao);

//Pegar informação de um projeto referente ao ID
app.get("/projects/:id", verificaID, (req, res) => {
  const { id } = req.params;

  const project = projects.findIndex(p => p.id == id);

  return res.json(projects[project]);
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

//Alterar apenas o Titulo por ID
app.put("/projects/:id", verificaID, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(projects);
});

//Deletar o projeto por ID
app.delete("/projects/:id", verificaID, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id == id);

  projects.splice(projectIndex, 1);

  return res.json({
    message: `Entrada referente ao ID ${id} deletada!`
  });
});

//Adicionar Tasks Para um projeto existente por ID
app.post("/projects/:id/tasks", verificaID, (req, res) => {
  const { id } = req.params;
  const { tasks } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(tasks);

  return res.json(projects);
});

//Desginar a porta para a variável APP declarada no inicio do código
app.listen(3000);

//**FINALIZADO :)
