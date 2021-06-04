exports.up = function(knex) {
    return knex.schema.
    createTable('questoes',function(table){
      table.increments('id');
      table.string('enunciado_questao').notNullable();
      table.boolean('questao_verdadeira_falsa').notNullable();
      table.boolean('questao_certa').defaultTo(null);
      table.enu('dificuldade',['1','2','3','4','5','6','7','8','9','10']);
      table.string('opcao_a').defaultTo(null)
      table.string('opcao_b').defaultTo(null)
      table.string('opcao_c').defaultTo(null)
      table.string('opcao_d').defaultTo(null)
      table.string('opcao_e').defaultTo(null)
      table.string('opcao_certa').defaultTo(null)
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('update_at').defaultTo(knex.fn.now())
      table.integer('assunto_id_fk')

      table.foreign('assunto_id_fk').references('id_assunto').inTable('assunto')
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('questoes');
  };
  