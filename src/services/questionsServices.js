const connection = require('../database/connection');
class questionsServices { 
  async create(questao){
    if(questao.questao_verdadeira_falsa){
      try{
        return await connection('questoes').insert({ enunciado_questao:questao.enunciado,
        questao_verdadeira_falsa:questao.questao_verdadeira_falsa ,
        questao_certa:questao.questao_certa,
        materia:questao.materia,assunto:questao.assunto,dificuldade:questao.dificuldade})
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
        materia:questao.materia,assunto:questao.assunto,dificuldade:questao.dificuldade
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
}
module.exports= questionsServices;
