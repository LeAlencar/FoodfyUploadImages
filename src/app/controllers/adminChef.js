const Chef = require('../models/chef')
const { date } = require('../../lib/utils')

module.exports = {
  	index(req, res) {
		Chef.all(function(chefs) {
			return res.render("admin/chef/index", {chefs})
		})
	},
	// Create
	create(req, res ) {
		return res.render("./admin/chef/create")
	},
	show(req, res) {
		Chef.selectOne(req.params.id, function(chef) {
			
			if(!chef) return res.send("chef not found")
			chef.created_at = date(chef.created_at).format
			return res.render("./admin/chef/chef", {chef})
		})
	},
	// Post
	post(req,res) {
		const keys = Object.keys(req.body)
		
    	for(key of keys) {
      		if(req.body[key] == "") 
        		return res.send('Please, fill all fields!')
      		
		}
		
		Chef.create(req.body, function(chef) {
			return res.redirect(`/admin/chef/${chef.id}`)
		})
	},
	edit(req, res) {
		Chef.find(req.params.id, function(chef){
			if(!chef) return res.send("Chef not found")
			return res.render("./admin/chef/edit", {chef})
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
	
		Chef.update(req.body, function(){
			return res.redirect(`/admin/chef/${req.body.id}`)
		})

	},
	delete(req,res) {
		const chefIndex = req.params.index;
		
		data.chefs.splice(chefIndex, 1)
	
	}  
}