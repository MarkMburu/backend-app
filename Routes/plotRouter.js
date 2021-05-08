const express = require("express");
const router = express.Router();
const queries = require("../db/plotQueries");

router.get("/",(req,res)=>{
    queries.getAllPlots().then(plots =>{
        res.status(200).json(plots);
    })
    .catch(err => console.log(err));
});

router.post("/",(req,res)=>{
    queries.create(req.body).then(plots =>{
        res.status(201).json(plots)
    })
    .catch(err => res.json(err));
});
router.get("/:id",(req,res)=>{
    queries.getPlotById(req.params.id).then(plots =>{
        res.status(200).json(plots[0])
    })
    .catch(err => req.json(err));
});

router.patch("/update/:id",(req,res)=>{
  queries.updatePlot(req.params.id,req.body).then(plots =>{
      res.status(201).json(plots)
  })
  .catch(err => res.json(err));
});

router.delete("/:id",(req,res)=>{
    queries.deletePlot(req.params.id).then(plots =>{
        res.status(200).json(plots)
    })
    .catch(err => res.json(err))
});

module.exports = router;