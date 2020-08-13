const Recipe = require('../../models/recipe')
const data = require('../../../data.json')

module.exports = {
    index(req, res) {
        const { filter } = req.query

        if (filter) {
            res.render("./user/index", { recipes: data.recipes });
        }
        res.render("./user/index", { recipes: data.recipes });
    },
    
    //about
    about(req, res) {
        res.render("user/about");
    },
    // view all recipes
    view(req, res){
        res.render("user/recipes", {recipes: data.recipes})
    },
    //show
    show(req, res) {
        const recipe = data.recipes;
        // get the index of the [].
        const recipeIndex = req.params.index;
        return res.render("../views/user/recipe", { recipe: recipe[recipeIndex]})
    },
    
}
