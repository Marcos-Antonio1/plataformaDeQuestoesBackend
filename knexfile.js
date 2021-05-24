// Update with your config settings.
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/banco.sqlite3'
    },
    migrations: {
      directory:'./src/database/migrations',
      tableName: 'knex_migrations'
    }
  },
  test : {
    client: 'sqlite3',
    connection: {
      filename: './src/database/banco.sqlite3'
    },
    migrations: {
      directory:'./src/database/migrations',
      tableName: 'knex_migrations'
    }
  },
  staging: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/banco.sqlite3'
    },
    migrations: {
      directory:'./src/database/migrations',
      tableName: 'knex_migrations'
    }

  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/banco.sqlite3'
    },
    migrations: {
      directory:'./src/database/migrations',
      tableName: 'knex_migrations'
    }
  }

};
