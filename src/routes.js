const express = require('express');
const routes = express.Router();
const recipes = require('./app/controllers/recipes')
const admin = require("./app/controllers/admin")
const adminChef = require("./app/controllers/adminChef")
const chef = require("./app/controllers/chefs")
const multer = require("./app/middlewares/multer")

// User View
routes.get('/', recipes.index)
routes.get('/recipes', recipes.view);
routes.get('/about', recipes.about)
routes.get("/recipe/:id", recipes.show)
routes.get("/chefs", chef.index)

// Admin
routes.get('/admin', function(req, res ) {
    return res.redirect("/admin/recipes") 
})
routes.get('/admin/recipes', admin.index)
routes.get('/admin/recipe/create', admin.create)
routes.get('/admin/recipe/:id', admin.show)
routes.post('/admin/recipe/create', multer.array("photos", 6),admin.post)
routes.get('/admin/recipe/edit/:id', admin.edit)
routes.put("/admin/recipe/create", multer.array("photos", 6), admin.put)
routes.delete("/admin/recipe/create", admin.delete)

// Chef Admin Routes
routes.get('/admin/chefs', adminChef.index)
routes.get('/admin/chef/create', adminChef.create)
routes.get('/admin/chef/:id', adminChef.show)
routes.post('/admin/chef/create', adminChef.post)
routes.get('/admin/chef/edit/:id', adminChef.edit)
routes.put('/admin/chef/create', adminChef.put)
routes.delete('/admin/chef/create', adminChef.delete)

module.exports = routes;