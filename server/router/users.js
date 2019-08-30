'use strict'

const express = require('express')


const Userscontroller = require('../controller/users')

const api = express.Router()
//Login
api.post('/users/login', Userscontroller.loginusers)

module.exports = api
