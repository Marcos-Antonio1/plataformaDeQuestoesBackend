const connection = require('../database/connection');
class materiaService{
    async create(nome){
        try{
            const alreadyExists = await connection('materia').where({nome_materia:nome}).first();
            if(alreadyExists) return {"msg":"nome de materia já cadastrado"}
            return await connection('materia').insert({nome_materia:nome})
        }catch(err){
            throw err;
        }
    }
    async delete(id){
        try{
            return  connection('materia').where('id_materia',id).del()
        }catch(err){
            throw err;
        }
    }
}
module.exports =materiaService;