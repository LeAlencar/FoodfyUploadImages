// Pra não enviar login e senha toda vez
const { Pool } = require("pg")

module.exports = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'Foodfy'
})