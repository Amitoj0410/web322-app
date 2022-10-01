var blog_service = require("./blog-service");
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
  //res.setHeader()
  // res.send(JSON.stringify({key:"value"}));
  res.send("hello");
});

app.listen(HTTP_PORT, onHttpStart);