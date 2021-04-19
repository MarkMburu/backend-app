const knex = require("./knex");

module.exports={
    getAll(){
        return knex('user');
    },
    create(user){
        return knex("user").insert(user,'*')
    },
    getById(id){
        return knex("user").where({'id':id})
    },
    updateUser(id,data){
        return knex('user')
        .where({ "id": id })
        .update(data,"*")
     },
     deleteUser(id){
         return knex("user").where({ "id": id })
         .del()
     },
     getUser(email){
         return knex("user").where({"email": email})
     }
}