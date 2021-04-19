const knex = require("./knex");

module.exports ={
    getProjects(){
        return knex("project");
    },
    create(project){
        return knex("project").insert(project,"*");
    },
    getProjectById(id){
        return knex("project").where({"id": id});
    },
    updateProject(id,data){
        return knex("project")
        .where({ "id": id })
        .update(data,"*");
    },
    deleteProject(id){
        return knex("project")
        .where({"id": id})
        .del();
    }
}