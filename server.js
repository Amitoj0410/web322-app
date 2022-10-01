/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: __Amitoj Singh____________________ Student ID: _159347210_____________ Date: _30/09/2022 (dd/mm/yyyy)_______________
*
*  Online (Cyclic) Link: ________________________________________________________
*
********************************************************************************/ 


var blog_service = require("./blog-service.js");
const path = require('path');

var express = require("express");
var app = express();

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


app.listen(HTTP_PORT, onHttpStart);