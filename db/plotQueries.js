const knex = require("./knex");

module.exports = { 
    getAllPlots(){
        return knex("plots")
    },
    create(data){
      return knex("plots").insert(data,"*")
    },
    getPlotById(id){
        return knex("plots").where({"id": id})
    },
    getPlotProjectId(projectId){
        return knex("plots").where({"projectId":projectId})
    },
    updatePlot(id,data){
        return knex("plots")
        .where({"id":id })
        .update(data,"*")
    },
    deletePlot(id){
        return knex("plots")
        .where({"id":id})
        .del()
    }
}