const connection = require('../database/connection');
class questionsServices { 
  async create(questao){
    if(questao.questao_verdadeira_falsa){
      try{
        return await connection('questoes').insert({ enunciado_questao:questao.enunciado,
        questao_verdadeira_falsa:questao.questao_verdadeira_falsa ,
        questao_certa:questao.questao_certa,
       assunto_id_fk:questao.assunto_id_fk,dificuldade:questao.dificuldade})
      }catch(err){
        throw err;
      }
    }else {
      try{
        return await connection('questoes')
        .insert({enunciado_questao:questao.enunciado,questao_verdadeira_falsa:questao.questao_verdadeira_falsa,opcao_a:questao.opcao_a,
        opcao_b:questao.opcao_b,
        opcao_c:questao.opcao_c,
        opcao_d:questao.opcao_d,
        opcao_e:questao.opcao_e,
        opcao_certa:questao.opcao_certa,
        assunto_id_fk:questao.assunto_id_fk,dificuldade:questao.dificuldade
        });
      }catch(err){
        throw err;
      }
    }
  }
  async delete(id){
    try{
     return await connection('questoes').where('id',id).del()
    }catch(err){
      throw err;
    }
  }
  async searchAll(){
     return await connection('questoes').select('*')
  }
  async getQuestionById(idquestion){
    return await connection('questoes').where({id:idquestion}).select('*')
  } 
  async responseItem(id,op){
    try{
      const ques = await this.getQuestionById(id)
      if(op == ques[0].questao_certa) return {"resposta":'correta','questao': ques ? 'certa' :'errada'}
      return {"resposta":"errada",'questao': ques ? 'certa' :'errada'}    
    }catch(err){
      throw err;
    }
  }
}
module.exports= questionsServices;
