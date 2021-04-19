exports.up = function(knex) {
    return knex.schema.createTable('gallery',(table)=>{
        table.increments();
        table.bigInteger('projectId').unsigned().index().references('id').inTable('project')
        table.binary("image");
        table.text('contentType');
        table.timestamps(false, true)
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("gallery")
  };