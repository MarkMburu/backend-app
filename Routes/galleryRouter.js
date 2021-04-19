const express = require("express");
const fs = require("fs");
const router = express.Router();
const queries = require("../db/galleryQueries");
const multer = require('multer');

// SET STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });

   
const upload = multer({ storage: storage,limits: {
    fieldNameSize: 200,
    files: 5,
    fields: 5
}});

router.post("/",upload.single('myfiles'),function(req,res){
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file)
   });

//Uploading multiple files
router.post('/multiple', upload.array('myFiles', 12), (req, res, next) => {
    const files = req.files
    if (!files) {
      const error = new Error('Please choose files')
      error.httpStatusCode = 400
      return next(error)
    }
   
      res.send(files)
    
  })

module.exports = router;