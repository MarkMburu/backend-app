exports.up = function(knex) {
    return knex.schema.createTable('plot',(table)=>{
        table.increments();
        table.bigInteger('projectId').unsigned().index().references('id').inTable('project')
        table.bigInteger('userId').unsigned().index().references('id').inTable('user')
        table.integer("size");
        table.text("description");
        table.integer("plotnumber")
        table.integer('price');
        table.boolean("isAvailabe");
        table.boolean("isBooked");
        table.timestamps(false, true)
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("plot")
  };