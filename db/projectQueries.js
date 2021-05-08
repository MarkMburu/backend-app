const knex = require("./knex");

module.exports ={
    getProjects(){
        return knex("projects");
    },
    create(project){
        return knex("projects").insert(project,"*");
    },
    getProjectById(id){
        return knex("projects").where({"id": id});
    },
    updateProject(id,data){
        return knex("projects")
        .where({ "id": id })
        .update(data,"*");
    },
    deleteProject(id){
        return knex("projects")
        .where({"id": id})
        .del();
    }
}