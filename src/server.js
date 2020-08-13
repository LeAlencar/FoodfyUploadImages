const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const server = express();

const methodOverride = require('method-override')

server.use(express.urlencoded({extended: true})) // faz funcionar o req.body
server.use(express.static('public')) // o servidor reconhece o css como estático.
server.use(methodOverride('_method'))
server.use(routes)


server.set("view engine", "njk");
nunjucks.configure("src/app/views", { 
  express: server, 
  autoescape: false,
  noCache: true
});

server.listen(5000, () => {
  console.log("[Server]", 'is running');
});