const questionsServices = require("../services/questionsServices");
const question = new questionsServices();
class questionsController {
  async create(request,response){
    const questao = {...request.body}
    try{
      const result =  await question.create(questao)
      console.log(result)
      return response.send(result)
    }catch(err){
      return response.send(err)
    }
  }
  async delet(req,res){
    const id= req.params.id
    try{
      await question.delete(id)
      res.status(200).send("Questão excluída")
    }catch(err){
      return res.send(err)
    }
  }
  async serchAll(req,res){
    try{
      const dados=  await question.searchAll()
      return res.send(dados)
    }catch(err){
      return res.send(err)
    }
  }
  async responseItem(req,res){
    try{
      const id = req.params.id;
      const op = req.body.op;
      const response = await question.responseItem(id,op)
      return res.json(response).status(200)
    }catch(err){
      return res.send(err).status(500)
    }
  }
}

module.exports = questionsController
