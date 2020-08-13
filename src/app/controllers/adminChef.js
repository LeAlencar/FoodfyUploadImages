const data = require('../../../data.json')

module.exports = {
  	index(req, res) {
		res.render("./admin/chefs", { recipes: data.recipes });
    }
}