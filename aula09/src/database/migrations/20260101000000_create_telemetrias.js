exports.up = function(knex) {
  return knex.schema.createTable('telemetrias', function(table) {
    table.increments('id').primary();
    table.integer('veiculo_id').unsigned().notNullable();
    table.foreign('veiculo_id').references('id').inTable('veiculos').onDelete('CASCADE');
    table.float('velocidade').notNullable();
    table.float('temperatura_motor').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('telemetrias');
};
