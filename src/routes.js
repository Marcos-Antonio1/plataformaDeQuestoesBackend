const express  = require('express')
const indexController = require('./controllers/indexController');
const questionsController = require('./controllers/questionsController');
const routes = express.Router();

const index = new indexController()
const questions = new questionsController()

routes.get("/",index.home);
routes.post("/questions",questions.create);
routes.delete("/questions/:id",questions.delet);
routes.get("/questions/all", questions.serchAll);


module.exports= routes;
