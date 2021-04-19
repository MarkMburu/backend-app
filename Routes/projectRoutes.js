const express = require('express');
const router = express.Router();
const queries = require("../db/projectQueries");
const { checkValidToken } = require("../Middlewares/auth_token_validation");

router.get("/",(req,res)=>{
    queries.getProjects().then(projects=>{
        res.status(200).json(projects);
    })
    .catch(err => res.status(404).json(err));
});

router.post("/",(req,res)=>{
    queries.create(req.body).then(project =>{
        res.status(200).json(project)
    })
    .catch(err => res.status(404).json(err));
});

router.get('/:id',(req,res)=>{
    queries.getProjectById(req.params.id).then(projects =>{
        res.status(200).json(projects[0])
    })
    .catch(err => res.status(404).json(err));
})
router.patch("/update/:id",(req,res)=>{
    queries.updateProject(req.params.id,req.body).then(project =>{
        res.status(201).json(project)
    })
    .catch(err => res.status(404).json(err))
});

router.delete('/:id',(req,res)=>{
   queries.deleteProject(req.params.id).then(project => {
       res.json(project)
   })
   .catch(err => res.json(err));
});

module.exports = router;