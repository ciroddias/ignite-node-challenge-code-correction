const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title: title,
    url: url,
    techs: techs,
    likes: 0
  };

  repositories.push(repository)

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repository = repositories.find(repository => repository.id === id);

  if (repository) {

    repository.title = title;
    repository.url = url;
    repository.techs = techs;
  
    return response.status(200).json(repository);

  } else {
    
    return response.status(404).json({ error: "Repository not found" });

  }
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repository => repository.id === id);

  if (repository) {
   
    repositories.pop(repository);

    return response.status(204).send();

  } else {

    return response.status(404).json({ error: "Repository not found" });

  }
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repository => repository.id === id);

  if (repository) {
    
    const likes = ++repository.likes;
  
    return response.status(200).json(repository);
  
  } else {

    return response.status(404).json({ error: "Repository not found" });

  }

});

module.exports = app;
