const { Pool } = require('pg')
const parse = require('pg-connection-string')


const DATABASE_URL = process.env.DATABASE_URL

const pool = new Pool(parse(DATABASE_URL))


module.exports = pool
