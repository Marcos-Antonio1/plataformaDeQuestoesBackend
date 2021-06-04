const assuntoServices = require('../services/assuntoServices');
const assunto = new assuntoServices()
class assuntoController{

    async create(req,res){
        const {nome, id} = req.body;
        try{
            const result = await assunto.create(nome,id);
            return res.send(result)
        }catch(err){
            return res.send(err)
        }
    }

    async delete(req,res){

    }

}

module.exports = assuntoController
