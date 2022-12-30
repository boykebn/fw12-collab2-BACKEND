const { Pool } = require('pg')

const db = new Pool({
    connectionString: 
    process.env.DATABASE_URL 
})

db.connect((err) =>{
  if(err) {
    console.log(err)
    console.log('database is not connect')
  } else{
    console.log('database is connect!')
  }
})
module.exports = db
