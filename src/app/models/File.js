const db = require('../../config/db')
const fs = require('fs')

module.exports = {
    create({ filename, path }) {
        const query = `
            INSERT INTO files (
                name,
                path,
            ) VALUES ($1, $2)
            RETURNING id                    
        `
        
        const values = [
            filename,
            path,
        ]

        return db.query(query, values)
    },

    recipesFiles(id){

        const query = `SELECT files.id AS id, files.path as path FROM ((recipes
            INNER JOIN recipes_files ON recipes_files.recipe_id = recipes.id)
            INNER JOIN files ON recipes_files.file_id = files.id)                                           
            WHERE recipes.id = $1`


            return db.query(query,[id])
    },
    
    async delete(id) {

        try {
            const result = await db.query(`SELECT * FROM files WHERE id = $1`, [id])
            const file = result.rows[0]
            fs.unlinkSync(file.path)

            return db.query(`
                DELETE FROM files WHERE id = $1
                `, [id])
            
        } catch(err) {
            console.error(err)
        }
        
       
    }
}