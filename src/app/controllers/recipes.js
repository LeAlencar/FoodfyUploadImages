const Recipe = require('../models/recipe')

module.exports = {
    index(req, res) { 
        const {filter} = req.query
        if(filter) {
            Recipe.findBy(filter, function(recipes) {
                return res.render("user/recipes", {recipes})
            })
        } else {
            Recipe.all(function(recipes) {
                return res.render("user/index", {recipes})

            })
        }
     
    },
    
    //about
    about(req, res) {
        res.render("user/about");
    },
    // view all recipes
    view(req, res){
        const {filter} = req.query
        if(filter) {
            Recipe.findBy(filter, function(recipes) {
                return res.render("user/recipes", {recipes})
            })
        } else {
            Recipe.all(function(recipes) {
                return res.render("user/recipes", {recipes})

            })
        }
    },

    //show
    show(req, res) {
        Recipe.find(req.params.id, function(recipe) {
            if(!recipe) return res.send("Recipe not found")

            return res.render("./user/recipe", {recipe})
        })
        
    },
    
}
