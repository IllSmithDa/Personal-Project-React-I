
exports.up = function(knex, Promise) {
  return knex.schema.createTable(('users'), tbl => {
    tbl.increments('user_id')
    tbl.string('username', 16)
      .notNullable()
    tbl.string('password', 16)
      .notNullable()
    tbl.timestamp('createdAt')
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
