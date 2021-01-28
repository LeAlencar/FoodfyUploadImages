const db = require('../../config/db')
const { date } = require('../../lib/utils')
module.exports = {
    all(callback) {
        db.query(`SELECT recipes.*, chefs.name as chef_name 
        FROM recipes 
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)`, function(err, results){
            if(err) throw `Database error: ${err}`
            callback(results.rows)
        })
    },
    //create
    create(data) {
        const query = `
            INSERT INTO recipes (
               chef_id,
               title,
               ingredients,
               preparation,
               information,
               created_at 
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `
        
        const values = [
            data.chef,
            data.title,
            typeof data.ingredients === "string" ? [data.ingredients] : data.ingredients,
            typeof data.preparation === "string" ? [data.preparation] : data.preparation,
            data.information,
            date(Date.now()).iso
        ]
        db.query(query, values)
    },
    findRecipe(id) {
        return db.query(` SELECT * FROM recipes WHERE id = $1`, [id])
    },
    // catch one id
    async find(id) {
        const results = await db.query(`SELECT recipes.*, chefs.name as chef_name
            FROM recipes 
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.id = $1`, [id]
        )
        return results.rows[0];
    },
    
    findBy(filter){
        db.query(`SELECT recipes.* 
        FROM recipes
      	LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.title ILIKE '%${filter}%'
        GROUP BY recipes.id`)
    },
    //update the recipe if anything changes.(put)
    update(data) {
        const query = `
			UPDATE recipes SET
				chef_id=($1),
				image=($2),
				title=($3),
				ingredients=($4),
				preparation=($5),
				information=($6),
				created_at=($7)

			WHERE id = $8
		`
		const values = [
			data.chef_id,
			data.image,
			data.title,
			typeof data.ingredients === "string" ? [data.ingredients] : data.ingredients,
            typeof data.preparation === "string" ? [data.preparation] : data.preparation,
			data.information,
            date(Date.now()).iso,
            data.id
		]

		db.query(query, values)
    },
    delete(id) {
        db.query(`DELETE FROM recipes WHERE id = $1`, [id])
    },
    chefSelectOptions() {
        db.query(`SELECT * FROM chefs`)
    },
    files(id) {
        return db.query(`
            SELECT * FROM recipe_files WHERE recipe_id = $1
        `, [id])
    }
}