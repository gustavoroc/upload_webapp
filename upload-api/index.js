const express = require("express");
const multer = require("multer");

const app = express();


const upload = multer({
    dest: './uploads/',
})


app.post("/upload", upload.single('file'), ( req, res) => {
    res.json({ file: req.file });
})

app.get('/download/:id', function(req, res){
    const file = `${__dirname}/uploads/${req.params.id}`;
    res.download(file); // Set disposition and send it.
  });
  
app.listen(3344, () => {
    console.log("App is running on localhost:3344");
})