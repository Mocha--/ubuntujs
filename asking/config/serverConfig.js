// config/serverConfig.js

// use strict mode
"use strict"

// ==============================
// call packages
// ==============================

var express = require("express")
var bodyParser = require("body-parser")
var format = require("string-format")
var cors = require("cors")
var socketIO = require("socket.io")

// ==============================
// app config
// ==============================

// instance of an express application
var app = express()

// use body-parser
// bodyparser can get the params from POST request
app.use(bodyParser.urlencoded({
    "extended": true
}))
app.use(bodyParser.json())

// enable CORS
app.use(cors())

// use string format which is just like python String
format.extend(String.prototype)

// ==============================
// socket.io config
// ==============================

// create http server used to attach websocket
var server = require("http").Server(app)
var io = socketIO(server)

module.exports = {
    "app": app,
    "io": io
}
