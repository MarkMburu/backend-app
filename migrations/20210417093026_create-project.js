exports.up = function(knex) {
    return knex.schema.createTable('project',(table)=>{
        table.increments();
        table.text("projectname");
        table.integer('numberofplots');
        table.string("projectDetails",2000);
        table.binary("image");
        table.string("contentType")
        table.timestamps(false, true);
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("project")
  };
