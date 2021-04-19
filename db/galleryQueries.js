const knex = require('knex');

module.exports = {
    getAll() {
        return knex("gallery")
    },
    create(data) {
        return knex("gallery").insert(data, "*")
    },
    
    getGalleryById(id) {
        return knex("gallery").where({ "id": id })
    },

    updateGallery(id, data) {
        return knex("gallery")
            .where({ "id": id })
            .update(data, "*");
    },

    deleteGallery(id) {
        return knex("project")
            .where({ "id": id })
            .del();
    }
}