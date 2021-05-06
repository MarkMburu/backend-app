exports.up = async db => {
  await db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await db.raw('CREATE EXTENSION IF NOT EXISTS "hstore"');
  await db.schema.createTable('projects', table => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v4()')).primary();
    table.string('projectname', 120).notNullable();
    table.string('location', 120).notNullable();
    table.string('latitude', 120).notNullable();
    table.string('longitude', 120).notNullable();
    table.boolean('active').notNull().defaultTo(false);
    table.integer('numberofplots');
    table.binary("image").notNullable;
    table.string("contentType").notNullable;
    table.timestamps(false, true);
  })
};

exports.down = async db => {
  await db.schema.dropTableIfExists('projects');
};