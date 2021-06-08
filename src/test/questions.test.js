const axios = require ('axios')
const crypt = require('crypto');
const materiaService = require('../services/materiaServices')
const questionServices = require('../services/questionsServices')
const assuntoServices = require("../services/assuntoServices");
const questions= new questionServices();
const materia = new materiaService();
const assunto = new assuntoServices();

const generate = ()=>{
  return crypt.randomBytes(20).toString('hex')
}
const request = function(url,method,data){
  return axios({
    url,
    method,
    data
  })
}
test("Should be a register a new materia",async ()=>{
    const data = {
      nome:generate()
    }
    const response = await request('http://localhost:8000/criarmateria',"post",data)
    if(response.data){
      const id = response.data[0]
       await materia.delete(id) 
    }
    const resul = typeof(response.data[0])
    expect(resul).toBe('number');
})

test("Should be a register a new assunto", async()=>{
    let nome=generate()
    const newmateria = await materia.create(nome)

    const idMateria= newmateria[0];

    const data = {
      nome:generate(),
      id:idMateria  
    }
    console.log(data)
    const response = await request('http://localhost:8000/criarassunto',"post",data)
    
    if(response.data){
      const id = response.data[0]
      await assunto.delete(id) 
    }
    await materia.delete(idMateria)

    const resul = typeof(response.data[0])
    expect(resul).toBe('number')
})

describe('test of manipulation questions', () => {
  
  let materiaId, assuntoId =0;
  beforeEach(async()=>{

    let nomeMateria=generate()
    const newmateria = await materia.create(nomeMateria)
    materiaId = newmateria[0];
    const nomeAssunto= generate()
    const newAssunto = await assunto.create(nomeAssunto,materiaId)
    assuntoId= newAssunto[0]

  })
  afterEach(async()=>{
     await assunto.delete(assuntoId)
     await materia.delete(materiaId)
  })
  test('Should be a register a true or false new question',async()=>{
  const data = {
      enunciado:generate(),
      questao_verdadeira_falsa:true,
      questao_certa:true,
      assunto_id_fk:assuntoId,
      dificuldade:'1'
  }
  const response= await request('http://localhost:8000/questions',"post",data)
  await questions.delete(response.data[0]) 
  const result = typeof(response.data[0])
  expect(result).toBe('number')
})
  test("Should be a register a five options new questions",async ()=>{
    const data = {
      enunciado:generate(),
      questao_verdadeira_falsa:false,
      opcao_certa:'e',
      assunto_id_fk:assuntoId, 
      dificuldade:'1',
      opcao_a:generate(),
      opcao_b:generate(),
      opcao_c:generate(),
      opcao_d:generate(),
      opcao_e:generate()
    }
    const response = await request('http://localhost:8000/questions',"post",data)
    await questions.delete(response.data[0])
    const result = typeof(response.data[0])
    expect(result).toBe('number') 
  })

  test("Should be delete a question for id",async()=>{
    const data = {
      enunciado:generate(),
      questao_verdadeira_falsa:false,
      opcao_certa:'e',
      assunto_id_fk:assuntoId, 
      dificuldade:'1',
      opcao_a:generate(),
      opcao_b:generate(),
      opcao_c:generate(),
      opcao_d:generate(),
      opcao_e:generate()
    }
      const questaoInserida = await questions.create(data)
      const id = questaoInserida[0]
      await request(`http://localhost:8000/questions/${id}`,'delete')
      const total = await questions.searchAll()  
      expect(total).toHaveLength(0);
    })
  test('should return all registers',async()=>{
    const data = {
      enunciado:generate(),
      questao_verdadeira_falsa:false,
      assunto_id_fk:assuntoId,
      dificuldade:'1',
      opcao_certa:'e',
      opcao_a:generate(),
      opcao_b:generate(),
      opcao_c:generate(),
      opcao_d:generate(),
      opcao_e:generate()
    }
    const data1 = {
      enunciado:generate(),
      questao_verdadeira_falsa:false,
      opcao_certa:'e',
      assunto_id_fk:assuntoId,
      dificuldade:'1',
      opcao_a:generate(),
      opcao_b:generate(),
      opcao_c:generate(),
      opcao_d:generate(),
      opcao_e:generate()
    }
    const questaoInserida0 = await questions.create(data)
    const id0 = questaoInserida0[0]
    
    const questaoInserida1 = await questions.create(data1)
    const id1 = questaoInserida1[0]
    
    const result = await request('http://localhost:8000/questions/all','get');
     expect(result.data).toHaveLength(2);
  
     await questions.delete(id0)
     await questions.delete(id1)     
  })
  test('Should be response the question right or wrong',async()=>{
    const data = {
      enunciado:generate(),
      questao_verdadeira_falsa:true,
      questao_certa:true,
      assunto_id_fk:assuntoId,
      dificuldade:'1'
    }
    const qu1= await questions.create(data)
    const id = qu1[0]
    let dados = {
      op: true
    }
    const resposta = await request(`http://localhost:8000/resposta/${id}`,'post',dados)
    
    await questions.delete(id)
    expect(resposta.data.resposta).toBe(resposta.data.resposta);
    expect(resposta.data.questao).toBe(resposta.data.questao);
  })
});

