const { Pool } = require('pg')

const db = new Pool({
    connectionString: 
    process.env.DATABASE_URL 
})

mocule.exports = db