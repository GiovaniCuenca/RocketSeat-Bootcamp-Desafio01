const express = require("express");

const app = express();

app.use(express.json());

const projects = [
  {
    id: "0",
    title: "Novo projeto",
    tasks: ["Nova tarefa"]
  }
];

app.get("/projects/:index", (req, res) => {
  const { index } = req.params;

  return res.json(projects[index]);
});

app.get("/projects", (req, res) => {
  return res.json(projects);
});

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

app.listen(3000);
