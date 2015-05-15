// server/js

// use strict mode
"use strict"

// ==================================
// BASE SETUP
// ==================================

var app = require("./config/serverConfig").app
var io = require("./config/serverConfig").io
var db = require("./config/dbConfig")


// ==================================
// connect to database
// ==================================
db.connect()

// ==================================
// load middleware
// ==================================
var authMid = require("./app/middleware/authMiddleware")

// ==================================
// load routers
// ==================================
var authRouter = require("./app/router/authRouter")
var questionRouter = require("./app/router/questionRouter")
var answerRouter = require("./app/router/answerRouter")


// ==================================
// apply middlewares
// ==================================
app.use("/api", authMid)


// ==================================
// apply routers
// ==================================
app.use("/api", authRouter)
app.use("/api", questionRouter)
app.use("/api", answerRouter)




// test path
app.get("/askings", function(req, res) {
    res.send({
        "msg": "hehehe"
    })
})


app.listen(8080, function() {
    console.log("Listen to 8080 port")
})
