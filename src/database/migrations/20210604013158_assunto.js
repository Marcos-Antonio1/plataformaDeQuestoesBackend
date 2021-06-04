
exports.up = function(knex) {
    return  knex.schema.createTable('assunto',function(table){
        table.increments('id_assunto').primary();
        table.string('nome_assunto').notNullable().unique();
        table.integer('materia_id_fk').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());


        table.foreign('materia_id_fk').references('id_materia').inTable('materia')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('materia');
  
};
