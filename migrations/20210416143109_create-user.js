
exports.up = async db => {
    await db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await db.raw('CREATE EXTENSION IF NOT EXISTS "hstore"');

    await db.schema.createTable('users', table => {
        table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v4()')).primary();
        table.string('display_name', 100);
        table.string('username', 50).unique();
        table.string('email', 100).notNullable();
        table.string("phone").notNullable();
        table.string("password").notNullable();
        table.boolean('email_verified').notNullable().defaultTo(false);
        table.boolean('is_admin').notNullable().defaultTo(false);
        table.timestamps(false, true);
        table.timestamp('last_login_at').notNullable().defaultTo(db.fn.now());
       
    })
  };
  
  exports.down = async db => {
    await db.schema.dropTableIfExists('users');
  };
