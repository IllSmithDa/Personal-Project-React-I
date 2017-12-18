// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/vidhost.sqlite3'
    },
    migrations: {
      tableName: 'migrations'
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'vidhost',
      user:     'sam',
      password: 'kim'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'vidhost',
      user:     'sam',
      password: 'kim'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'kmigrations'
    }
  }

};
