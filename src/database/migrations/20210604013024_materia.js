
exports.up = function(knex) {
    return  knex.schema.createTable('materia',function(table){
        table.increments('id_materia').primary();
        table.string('nome_materia').notNullable().unique();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('materia');
};
