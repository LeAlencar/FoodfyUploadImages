const express = require('express');
const routes = express.Router();
const recipes = require('./app/controllers/recipes')
const admin = require("./app/controllers/admin")
const adminChef = require("./app/controllers/adminChef")


// User View
routes.get('/', recipes.index)
routes.get('/recipes', recipes.view);
routes.get('/about', recipes.about)
routes.get("/recipe/:index", recipes.show)


// Admin
routes.get('/admin', function(req, res ) {
    return res.redirect("/admin/recipes") 
})
routes.get('/admin/recipes', admin.index)
routes.get('/admin/recipe/create', admin.create)
routes.get('/admin/recipe/:index', admin.show)
routes.post('/admin/recipe/create', admin.post)
routes.get('/admin/recipe/edit/:index', admin.edit)
routes.put("/admin/recipe/edit/:index", admin.put)
routes.delete("/admin/recipe/:index", admin.delete)

// Chef Admin Routes
routes.get('/admin/chefs', adminChef.index)


module.exports = routes;