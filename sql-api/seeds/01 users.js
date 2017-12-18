
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'francis', password: 'worth'},
        { username: 'george', password: 'wallas'},
        { username: 'morgan', password: 'freeman'},
        { username: 'bob', password: 'forman'},
        { username: 'frank', password: 'capolla'}
      ]);
    });
};
