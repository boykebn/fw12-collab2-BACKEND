<<<<<<< HEAD
const { Pool } = require("pg");

require("dotenv").config();

const dbHelper = new Pool({
  connectionString: `${process.env.DB_URL}`,
});

dbHelper.connect((err) =>{
  if(err) {
    console.log(err)
    console.log('database is not connect')
  } else{
    console.log('database is connect!')
  }
})

module.exports = dbHelper;
=======
const { Pool } = require('pg')

const db = new Pool({
    connectionString: 
    process.env.DATABASE_URL 
})

mocule.exports = db
>>>>>>> 84078145ac80e92c5df875c9c09290bfa831d247
