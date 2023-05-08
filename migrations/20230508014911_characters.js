/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('characters', function(table) {
      table.increments('id');
      table.string('race', 255).notNullable();
      table.string('class', 255).notNullable();
      table.string('career', 255).notNullable();
      table.integer('level', 2).notNullable();
      table.string('akuma', 255).notNullable();
      table.integer('life', 4).notNullable();
      table.integer('currentlife', 4).notNullable();
    })
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('characters')
  };
