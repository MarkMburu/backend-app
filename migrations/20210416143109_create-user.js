
exports.up = function(knex) {
    return knex.schema.createTable('user',(table)=>{
        table.increments();
        table.text("firstname");
        table.text('lastname');
        table.text("email").unique();
        table.text("phone");
        table.text("password");
        table.text("confirmPassword");
        table.timestamps(false, true)
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("user")
  };
