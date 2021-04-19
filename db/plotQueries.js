const knex = require("./knex");

module.exports = { 
    getAllPlots(){
        return knex("plot")
    },
    create(data){
      return knex("plot").insert(data,"*")
    },
    getPlotById(id){
        return knex("plot").where({"id": id})
    },
    getPlotProjectId(projectId){
        return knex("plot").where({"projectId":projectId})
    },
    updatePlot(id,data){
        return knex("plot")
        .where({"id":id })
        .update(data,"*")
    },
    deletePlot(id){
        return knex("plot")
        .where({"id":id})
        .del()
    }
}