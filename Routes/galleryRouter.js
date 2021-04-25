const express = require("express");
const fs = require("fs");
const router = express.Router();
const queries = require("../db/galleryQueries");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/upload_files", upload.array("files"), uploadFiles);

function uploadFiles(req, res) {
    console.log(req.body);
    console.log(req.files);
    res.json({ message: "Successfully uploaded files" });
}


// router.post("/",upload.single('myfiles'),function(req,res){
//     const file = req.file
//     if (!file) {
//       const error = new Error('Please upload a file')
//       error.httpStatusCode = 400
//       return next(error)
//     }
//       res.send(file)
//    });

// //Uploading multiple files
// router.post('/multiple', upload.array('myFiles', 12), (req, res, next) => {
//     const files = req.files
//     if (!files) {
//       const error = new Error('Please choose files')
//       error.httpStatusCode = 400
//       return next(error)
//     }
   
//       res.send(files)
    
//   })

module.exports = router;