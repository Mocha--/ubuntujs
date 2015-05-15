// app/router/answerRouter.js

// use strict mode
"use strict"

// ========================================
// call packages
// ========================================
var express = require("express")
var async = require("async")

// ========================================
// call models
// ========================================
var Answer = require("./../model/answer")
var Question = require("./../model/question")


// define router
var answerRouter = express.Router()

answerRouter.route("/answers")
    // get all answers
    .get(function(req, res) {
        req.user.populate("answers", function(err, user) {
            res.send({
                "answers": user.answers
            })
        })
    })

answerRouter.route("/questions/:questionId/answers")
    .get(function(req, res) {
        Answer.find({
            "question": req.params.questionId
        }, function(err, answers) {
            res.send({
                "answers": answers
            })
        })
    })
    .post(function(req, res) {
        async.parallel([
            function(callback) {
                Question.findOne({
                    "_id": req.params.questionId
                }, function(err, question) {
                    if (!question) {
                        res.status(404)
                            .send({
                                "msg": "No Question Found!"
                            })
                    } else {
                        callback(null, question)
                    }
                })
            },
            function(callback) {
                Answer.create({
                    "body": req.body.content,
                    "owner": req.user.id,
                    "question": req.params.questionId
                }, function(err, answer) {
                    if (!answer) {
                        res.send({
                            "msg": "Create Answer Failed!"
                        })
                    } else {
                        callback(err, answer)
                    }
                })
            }
        ], function(err, results) {
            var question = results[0]
            var answer = results[1]
            question.answers.push(answer)
            question.save()
            req.user.answers.push(answer)
            req.user.save()
            res.send({
                "answer": answer
            })
        })
    })

answerRouter.route("/questions/:questionId/answers/:answerId")
    .get(function(req, res) {
        Answer.findOne({
            "_id": req.params.answerId
        }, function(err, answer) {
            if (!answer) {
                res.status(404)
                    .send({
                        "msg": "Answer Not Found!"
                    })
            } else {
                res.send({
                    "answer": answer
                })
            }
        })
    })
    .delete(function(req, res) {})


module.exports = answerRouter
