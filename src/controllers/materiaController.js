const materiaService = require('../services/materiaServices');
const materia = new materiaService()
class materiaController {
    async create(req,res){
        try{
            const nome = req.body.nome;
            const result = await materia.create(nome)
            return res.send(result)
        }catch(err){
            return res.send(err)
        }
    }
}

module.exports = materiaController;