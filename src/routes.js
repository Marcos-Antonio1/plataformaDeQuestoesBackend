const express  = require('express')
const indexController = require('./controllers/indexController');
const questionsController = require('./controllers/questionsController');
const materiaController = require('./controllers/materiaController');
const assuntoController = require('./controllers/assuntoController');
const routes = express.Router();

const index = new indexController()
const questions = new questionsController()
const materia = new materiaController()
const assunto = new assuntoController()


routes.get("/",index.home);
// materia
routes.post("/criarmateria",materia.create);
//assunto
routes.post("/criarassunto",assunto.create)
// questions
routes.post("/questions",questions.create);
routes.delete("/questions/:id",questions.delet);
routes.get("/questions/all", questions.serchAll);
routes.post("/resposta/:id",questions.responseItem);


module.exports= routes;
