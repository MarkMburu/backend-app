exports.up = async db => {
  await db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await db.raw('CREATE EXTENSION IF NOT EXISTS "hstore"');

  await db.schema.createTable('gallery', table => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v4()')).primary();
    table.uuid('projectId').unsigned().index().references('id').inTable('projects')
        table.binary("image");
        table.string('contentType');
        table.timestamps(false, true)
    })
  };
  
    
  exports.down = async db => {
    await db.schema.dropTableIfExists('gallery');
  };