const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    all(callback) {
        db.query(`SELECT chefs.*, count(recipes) AS total_recipes 
                FROM chefs
                LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
                GROUP BY chefs.id
                ORDER BY total_recipes DESC`, function(err, results){
            if(err) return res.send(`Database error: ${err}`)
            callback(results.rows)
        })
    },
    //create
    create(data, callback) {
        const query = `
            INSERT INTO chefs (
               name,
               avatar_url,
               created_at 
            ) VALUES ($1, $2, $3)
            RETURNING id
        `
        const values = [
            data.name,
            data.avatar_url,
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
            FROM chefs 
            WHERE id = $1`, [id], function(err, results) {
            if(err) throw `Database error: ${err}`
            callback(results.rows[0])
        })

    },

    

    selectOne(id, callback) {
        db.query(`SELECT chefs.*, recipes.image, recipes.title, recipes.id AS recipes_id, (SELECT count(*) FROM recipes WHERE chef_id = $1) AS total FROM chefs
        INNER JOIN recipes
        ON chefs.id = recipes.chef_id
        WHERE chefs.id = $1
        ORDER BY recipes.id`,[id], function(err,result){
            if(err) throw `Database error: ${err}`
            callback(result.rows)
        })
    },
    
    //update the chef if anything changes.(put)
    update(data, callback) {
        const query = `
			UPDATE chefs SET
				name=($1),
				avatar_url=($2),
				created_at=($3)

			WHERE id = $4
		`
		const values = [
			data.name,
			data.avatar_url,
            date(Date.now()).iso,
            data.id
		]

		db.query(query, values, function(err, results) {
            if(err) throw `Database error: ${err}`
            
            callback()
		})
    },
    delete(id, callback) {
        db.query(`DELETE FROM chefs WHERE id = $1`, [id], function(err, results) {
            if(err) throw `Database error! ${err}` 

            return callback()
        })
    },
}