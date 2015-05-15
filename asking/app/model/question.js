// app/model/question.js

// use strict mode
"use strict"

// ============================
// call packages
// ============================
var mongoose = require("mongoose")

// ============================
// call models
// ============================
//var User = require("./user")
//var Answer = require("./answer")

// ============================
// schema
// ============================
var QuestionSchema = new mongoose.Schema({
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
    "answers": [{
        "type": mongoose.Schema.Types.ObjectId,
        "default": null,
        "ref": "Answer"
    }],
    tags: [{
        "type": String,
        "default": null,
        "ref": "Tag"
    }]
})

module.exports = mongoose.model("Question", QuestionSchema)
