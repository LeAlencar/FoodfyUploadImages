const Recipe = require('../../models/recipe')
const { date } = require('../../lib/utils')

module.exports = {
  	index(req, res) {
		Recipe.all(function(recipes) {
			return res.render("admin/index", {recipes})
		})
  	}, 
  	// Create
  	create(req, res ) {
    	return res.render("./admin/create")
  	},
  	//show recipe for edit
	show(req, res) {
		Recipe.find(req.params.id, function(recipe) {
			
			if(!recipe) return res.send("Recipe not found")
			recipe.created_at = date(recipe.created_at).format

			return res.render("./admin/recipe", {recipe})
		})

	},
	//post
	post(req,res) {
		const keys = Object.keys(req.body)
		
    	for(key of keys) {
      		if(req.body[key] == "") 
        		return res.send('Please, fill all fields!')
      		
		}
		
		Recipe.create(req.body, function(recipe) {
			return res.redirect(`/admin/recipes/${recipe.id}`)
		})
    	
	},
	//edit
	edit(req, res) {
		Recipe.find(req.params.id, function(recipe){
			if(!recipe) return res.send("Recipe not found")
			
			return res.render("/admin/edit", {recipe})
		})
	},
	//put
	put(req,res) {
		const keys = Object.keys(req.body)
		for(key of keys) {
	  		if(req.body[key] == "") {
				return res.send('Please, fill all fields!')
	  		}
		}
	
		Recipe.update(req.body, function(){
			return res.redirect(`/admin/recipe/${req.body.id}`)
		})

	},
	delete(req,res) {
		const recipeIndex = req.params.index;
		
		data.recipes.splice(recipeIndex, 1)
	
	}  
}

