const Chef = require('../models/chef')

module.exports = {
    index(req, res) {
        /*const { filter } = req.query

        if (filter) {
            res.render("./user/index", { chefs });
        }
        res.render("./user/index", { chefs });
        */
       Chef.all(function(chefs) {
           return res.render("chef/index", {chefs})
       })
    },
    

    // view all chefs
    view(req, res){
        Chef.all(function(chefs) {
            return res.render("user/chefs", {chefs})
        })
    },
    //show
    show(req, res) {
        Chef.find(req.params.id, function(chef) {
            if(!chef) return res.send("Chef not found")

            return res.render("./user/chef", {chef})
        })
        
    },
    
}
