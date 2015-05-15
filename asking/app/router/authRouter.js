// app/router/authRouter.js

// use strict mode
"use strict"

// =============================
// call packages 
// =============================

var express = require("express")
var jwt = require("jsonwebtoken")
var async = require("async")
var jwtConfig = require("./../../config/jwtConfig")

// =============================
// call models
// =============================
var User = require("./../model/user")

// define router
var authRouter = express.Router()

// routes
authRouter.route("/login")
    .post(function(req, res) {
        User.findOne({
            "username": req.body.username,
            "password": req.body.password
        }, function(err, user) {
            if (user) {
                var token = jwt.sign(user.username, jwtConfig.key)
                res.send({
                    "token": token
                })
            } else {
                res.status(400)
                    .send({
                        "msg": "Login Failed!"
                    })
            }
        })
    })

authRouter.route("/register")
    .post(function(req, res) {
        async.series([
            function(callback) {
                User.findOne({
                    "username": req.body.username
                }, function(err, user) {
                    if (!user) {
                        callback(null)
                    } else {
                        res.status(400)
                            .send({
                                "msg": "User exists!"
                            })
                    }
                })
            },
            function(callback) {
                User.create({
                    "username": req.body.username,
                    "password": req.body.password
                }, function(err, user) {
                    res.send({
                        "user": user
                    })
                })
            }
        ])
    })

module.exports = authRouter
