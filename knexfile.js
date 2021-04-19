module.exports = {
  development: {
      client: 'pg',
      connection: {
        host:"localhost",
        database: 'anchor',
        user: 'postgres',
        password: 'root'
      }
    },
    test: {
      client: 'pg',
      connection: {
        host:"localhost",
        database: 'test_anchor',
        user: 'postgres',
        password: 'root'
      }
    }
  };