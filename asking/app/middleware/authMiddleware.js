// app/middleware/authMiddleware.js

// use strict mode
"use strict"

// ===============================
// call packages
// ===============================
var express = require("express")
var jwt = require("jsonwebtoken")
var jwtConfig = require("./../../config/jwtConfig")

// ===============================
// call models
// ===============================
var User = require("./../model/user")

// define router
var authMid = express.Router()

// list url which would not need to be loged in
var excludedPath = ["/login", "/register"]

authMid.use(function(req, res, next) {
    if (excludedPath.indexOf(req.path) != -1) {
        next()
    } else {
        if (!req.header("Authorization")) {
            res.status(403)
                .send({
                    "msg": "Authentication credentials were not provided!"
                })
        } else {
            var token = req.header("Authorization")
            jwt.verify(token, jwtConfig.key, function(err, decoded) {
                if (!decoded) {
                    res.status(403)
                        .send({
                            "msg": "Invalid Token!"
                        })
                } else {
                    User.findOne({
                        "username": decoded
                    }, function(err, user) {
                        if (!user) {
                            res.status(403)
                                .send({
                                    "msg": "Invalid Token!"
                                })
                        } else {
                            req.user = user
                            next()
                        }
                    })
                }
            })
        }
    }
})


module.exports = authMid
