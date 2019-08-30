'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')

const secret = 'secret'

exports.createToken = (user) => {
  const payload = {
    sub: user.id_user,
    dni: user.dni,
    name: user.name,
    surname: user.surname,
    role: user.role,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix
  }

  return jwt.encode(payload, secret)
}
