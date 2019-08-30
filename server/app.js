const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const user_routes = require('./router/users')



io.on('connection', (socket) => {
  console.log('a user connected');
})

app.set('port', process.env.PORT || 3333)
app.use(cors())
app.use(bodyParser.json({
  limit: '50mb'
}))
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}))

/**********************************************************
 * * Routes
 *********************************************************/
app.use('/api', user_routes)

app.use(morgan('dev'))

//app.use(express.static(path.join(__dirname, '../client/dist')))

http.listen(app.get('port'), () => {
  console.log(`listening on *:${app.get('port')}`);
})
