const { Pool } = require('pg'),
  keys = require('./keys.example')

const pool = new Pool(keys.database)

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  client.release()
})

module.exports = pool
