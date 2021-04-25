const express = require('express');
const router = express.Router();
const queries = require("../db/projectQueries");
const { checkValidToken } = require("../Middlewares/auth_token_validation");
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });



router.get("/",(req,res)=>{
    queries.getProjects().then(projects=>{
        res.status(200).json(projects);
    })
    .catch(err => res.status(404).json(err));
});

router.post("/",upload.single("files"),(req,res,next)=>{
    if (!req.file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
      }
    const img = fs.readFileSync(req.file.path);
    const encode_image = img.toString('base64');
    const finalImg = {
        contentType: req.file.mimetype,
        image:  Buffer.from(encode_image, 'base64')
     };
     const data = {...req.body,...finalImg};
     console.log("all data is here",data)
    queries.create(data).then(project =>{
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