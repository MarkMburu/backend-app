const knex = require("./knex");

module.exports={
    getAll(){
        return knex('users');
    },
    create(user){
        return knex("users").insert(user,'*')
    },
    getById(id){
        return knex("users").where({'id':id})
    },
    updateUser(id,data){
        return knex('users')
        .where({ "id": id })
        .update(data,"*")
     },
     deleteUser(id){
         return knex("users").where({ "id": id })
         .del()
     },
     getUser(email){
         return knex("users").where({"email": email})
     }
}