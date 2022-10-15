/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: __Amitoj Singh____________________ Student ID: _159347210_____________ Date: _30/09/2022 (dd/mm/yyyy)_______________
*
*  Online (Cyclic) Link: https://average-bull-sombrero.cyclic.app/
*
********************************************************************************/ 


var blog_service = require("./blog-service.js");
const path = require('path');

var express = require("express");
var app = express();

const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
  cloud_name: 'dwmi9l48l',
  api_key: '264368972983791',
  api_secret: 'UR1lQj75h9vDRHEKTNBmuYhGq44',
  secure: true
});

const upload = multer();

var HTTP_PORT = process.env.PORT || 8080;

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

app.use(express.static('public'));

app.get("/", function(req,res){
    res.redirect('/about');
});

app.get("/about", function(req,res){
    res.sendFile(path.join(__dirname,"/views/about.html"));
});

// setup another route to listen on /blog
app.get("/blog", function(req,res){
  res.sendFile(path.join(__dirname,"/data/posts.json"));
});

app.get("/posts", function(req,res){
  res.sendFile(path.join(__dirname,"/data/posts.json"));
});

app.get("/categories", function(req,res){
  res.sendFile(path.join(__dirname,"/data/categories.json"));
});

app.use((req, res) => {
  res.status(404).send("Error 404 ! Page Not Found");
});


app.get("/posts/add", function(req,res){
  res.sendFile(path.join(__dirname,"/views/addPost.html"));
});

//

app.post('/posts/add', upload.single("featureImage"), (req, res) => {
  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
            (error, result) => {
            if (result) {
                resolve(result);
            } else {
                reject(error);
            }
            }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
};

async function upload(req) {
    let result = await streamUpload(req);
    console.log(result);
    return result;
}

upload(req).then((uploaded)=>{
    req.body.featureImage = uploaded.url;

    // TODO: Process the req.body and add it as a new Blog Post before redirecting to /posts

});
})




app.listen(HTTP_PORT, onHttpStart);