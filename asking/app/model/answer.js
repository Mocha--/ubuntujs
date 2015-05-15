// app/model/answer.js

// use strict mode
"use strict"

// ============================
// call packages
// ============================
var mongoose = require("mongoose")

// ============================
// call models
// ============================
//var Question = require("./question")
//var User = require("./user")

// ============================
// schema
// ============================
var AnswerSchema = mongoose.Schema({
    "body": {
        "type": String,
        "default": ""
    },
    "date": {
        "type": Date,
        "default": ""
    },
    "owner": {
        "type": mongoose.Schema.Types.ObjectId,
        "required": true,
        "ref": "User"
    },
    "question": {
        "type": mongoose.Schema.Types.ObjectId,
        "required": true,
        "ref": "Question"
    }
})

module.exports = mongoose.model("Answer", AnswerSchema)
