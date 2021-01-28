const Recipe = require('../models/recipe')
const File = require('../models/File')
const { date } = require('../../lib/utils')

module.exports = {
  	index(req, res) {
		Recipe.all(function(recipes) {
			return res.render("admin/index", {recipes})
		})
  	}, 
  	// Create
  	create(req, res ) {
		Recipe.chefSelectOptions(function(options) {
			return res.render("/admin/create", { chefOptions: options })

		})
  	},
  	//show recipe for edit
	async show(req, res) {
		let results = await Recipe.findRecipe(req.params.id)
		const recipe = results.rows[0]

		if(!recipe) return res.send("Recipe not found")
		recipe.created_at = date(recipe.created_at).format
		recipe.preparation = recipe.preparation.splice(',')

		results = await Recipe.files(recipe.id)
		const files = results.rows.map(file => ({
			...file, 
			src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
		}))
		return res.render("./admin/recipe", {recipe, files})
	
	},
	//post
	async post(req,res) {
		const keys = Object.keys(req.body)
		
    	for(key of keys) {
      		if(req.body[key] == "") 
        		return res.send('Please, fill all fields!')
		}
		if(req.files.length == 0)
			return res.send("Please, send at least one image!")
		
		let results = Recipe.create(req.body)
		const recipeId = results.rows[0].id
	
		const filesPromise = req.files.map(file => File.create({...file, recipe_id: recipeId}))
		await Promise.all(filesPromise)
		
		return res.redirect(`/admin/recipe/${recipeId}`)
		
    	
	},
	async edit(req, res) {
		let results = Recipe.findRecipe(req.params.id)
		// getting undefined
		const recipe = results.rows[0]
		if(!recipe) return res.send("Recipe not found")

		 

		results = await Recipe.files(product.id)
        let files = results.rows
        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
		}))
		
		Recipe.chefSelectOptions(function(options) {
			return res.render("./admin/edit", {recipe, chefOptions: options, files})
			
		})
		
	},
	//put
	async put(req,res) {
		const keys = Object.keys(req.body)
		for(key of keys) {
	  		if(req.body[key] == "") {
				return res.send('Please, fill all fields!')
	  		}
		}
		if(req.files.length != 0) {
            const newFilesPromise = req.files.map(file => File.create({...file, recipe_id: req.body.id}))

            await Promise.all(newFilesPromise)
        }

        if(req.body.removed_files) {
            const removedFiles = req.body.removed_files.split(",")
            const lastIndex = removedFiles.length - 1
            removedFiles.splice(lastIndex, 1)

            const removedFilesPromise = removedFiles.map( id => File.delete(id))

            await Promise.all(removedFilesPromise)
        }

		await Recipe.update(req.body)

        return res.redirect(`/admin/recipes`)

	},
	async delete(req,res) {
		Recipe.delete(req.body.id)
		return res.redirect('/admin/recipes')
	}  
}

