const db = require('../config/db')
const { date } = require('../lib/utils')
module.exports = {
    all(callback) {
        db.query(`SELECT * FROM recipes`, function(err, results){
            if(err) return res.send(`Database error: ${err}`)
            callback(results.rows)
        })
    },
    //create
    create(data, callback) {
        const query = `
            INSERT INTO recipes (
               chef_id,
               image,
               title,
               ingredients,
               preparation,
               information,
               created_at 
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `
        const values = [
            data.chef_id,
            data.image,
            data.title,
            [data.ingredients],
            [data.preparation],
            data.information,
            date(Date.now()).iso
        ]
        db.query(query, values, function(err, results) {
            if(err) throw `Database error: ${err}`
            
            callback(results.rows[0])
        })
    },
    // catch one id
    find(id, callback) {
        db.query(`SELECT * 
            FROM recipes 
            WHERE id = $1`, [id], function(err, results) {
            if(err) throw `Database error: ${err}`
            callback(results.rows[0])
        })
    },
    //filter model
    findBy(filter, callback) {
        db.query(`SELECT recipes.*, count(chefs) AS total_chefs
        FROM chefs
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.title ILIKE '%${filter}%'
        OR recipes.chef_id ILIKE '%${filter}%'
        GROUP BY recipes.id
        ORDER BY total_chefs DESC`, function(err, results){
            if(err) throw `Database error: ${err}`
            callback(results.rows[0])
        })
    },
    //update the recipe if anything changes.(put)
    update(data, callback) {
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
			[data.ingredients],
			[data.preparation],
			data.information,
            date(Date.now()).iso,
            data.id
		]

		db.query(query, values, function(err, results) {
            if(err) throw `Database error: ${err}`
            
            callback()
		})
    },
    delete(id, callback) {
        db.query(`DELETE FROM recipes WHERE id = $1`, [id], function(err, results) {
            if(err) throw `Database error! ${err}` 

            return callback()
        })
    },
    

}