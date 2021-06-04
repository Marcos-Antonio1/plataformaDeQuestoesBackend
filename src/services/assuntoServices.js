const connection = require("../database/connection");
class assuntoServices{
    async create(nome,id){
        try{
            const assuntoAreadyExists = connection("assunto").where({nome_assunto:nome}).first()
            /* if (assuntoAreadyExists)  return {"msg":"nome do assunto já cadastrado"} */
            const result= await connection("assunto").insert({nome_assunto:nome,materia_id_fk:id})
            
            return result;
        }catch(err){
            throw err;
        }
    }
    async delete(id){
        try{
            return connection("assunto").where('id_assunto',id).del();
        }catch(err){
            throw err;
        }
    }

}

module.exports = assuntoServices;