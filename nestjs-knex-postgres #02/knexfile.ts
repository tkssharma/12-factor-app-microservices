export default {
  testing: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: 'dist/src/migrations/*.js',
    },
    seeds: {
      directory: 'dist/src/seeds/*.js',
    },
  },
  local: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: 'dist/src/migrations/*.js',
    },
    seeds: {
      directory: 'dist/src/seeds/*.js',
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: 'dist/src/migrations/*.js',
    },
    seeds: {
      directory: 'dist/src/seeds/*.js',
    },
  },
};
