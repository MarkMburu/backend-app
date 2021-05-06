exports.up = async db => {
  await db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await db.raw('CREATE EXTENSION IF NOT EXISTS "hstore"');

  await db.schema.createTable('plots', table => {
        table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v4()')).primary();
        table.uuid('projectId').unsigned().index().references('id').inTable('projects').notNullable();
        table.uuid('userId').unsigned().index().references('id').inTable('users')
        table.integer("size");
        table.text("description");
        table.integer("plotnumber")
        table.integer('price');
        table.boolean("isAvailabe").notNullable().defaultTo(false);
        table.boolean("isBooked").notNullable().defaultTo(false);
        table.timestamps(false, true)
    })
  };
  
  exports.down = async db => {
    await db.schema.dropTableIfExists('plots');
  };