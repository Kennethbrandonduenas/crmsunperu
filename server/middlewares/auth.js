'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')

const secret = 'secret'

exports.ensureAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({
      success: false,
      message: 'No tiene autorización para consumir este recurso'
    })
  }

  const token = req.headers.authorization.replace(/['"]+/g, '')

  try {
    const payload = jwt.decode(token, secret)

    if (payload.exp <= moment.unix()) {
      return res.status(401)
        .send({
          success: false,
          message: 'Token Expirado'
        })
    }

    req.auth = payload
    next()
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: 'Token no válido'
    })
  }
}
