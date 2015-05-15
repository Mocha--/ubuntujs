// app/router/questionRouter.js

// use strict mode
"use strict"

// =================================
// call packages
// =================================
var express = require("express")
var async = require("async")

// =================================
// call models
// =================================
var Question = require("./../model/question")
var Answer = require("./../model/answer")

// define router
var questionRouter = express.Router()

questionRouter.route("/questions")
    .get(function(req, res) {
        req.user.populate("questions", function(err, user) {
            res.send({
                "questions": user.questions
            })
        })
    })
    .post(function(req, res) {
        async.waterfall([
            function(callback) {
                Question.create({
                    "body": req.body.content,
                    "owner": req.user.id
                }, function(err, question) {
                    if (question) {
                        callback(null, question)
                    }
                })
            },
            function(question, callback) {
                req.user.questions.push(question)
                req.user.save(function(err) {
                    if (!err) {
                        res.send({
                            "question": question
                        })
                    }
                })
            }
        ])
    })

questionRouter.route("/questions/:questionId")
    .get(function(req, res) {
        req.user.populate("questions", function(err, user) {
            var isFound = false
            user.questions.forEach(function(question) {
                if (req.params.questionId == question.id) {
                    isFound = true
                    res.send({
                        "question": question
                    })
                }
            })
            if (isFound == false) {
                res.status(404)
                    .send({
                        "msg": "Not Found!"
                    })
            }
        })
    })
    .put(function(req, res) {

    })
    .delete(function(req, res) {
        async.parallel([
            function(callback) {
                var index = req.user.questions.indexOf(req.params.questionId)
                if (index > -1) {
                    req.user.questions.splice(index, 1)
                    req.user.save()
                }
                callback(null)
            },
            function(callback) {
                Question.remove({
                    "_id": req.params.questionId
                }, function(err) {
                    if (!err) {
                        callback(null)
                    }
                })
            },
            function(callback) {
                Answer.remove({
                    "question": req.params.questionId
                }, function(err) {
                    if (!err) {
                        callback(null)
                    }
                })
            }
        ], function(err, results) {
            console.log(results)
            res.send({
                "msg": "Remove Successfully!"
            })
        })
    })


module.exports = questionRouter
