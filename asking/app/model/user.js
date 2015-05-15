// app/model/user.js

// use strict mode
"use strict"

// ==============================
// call packages
// ==============================
var mongoose = require("mongoose")

// ==============================
// call models
// ==============================
var Question = require("./question")
var Answer = require("./answer")

// ==============================
// schema
// ==============================
var UserSchema = new mongoose.Schema({
    "username": String,
    "password": String,
    "email": {
        "type": String,
        "default": ""
    },
    "questions": [{
        "type": mongoose.Schema.Types.ObjectId,
        "default": null,
        "ref": "Question"
    }],
    "answers": [{
        "type": mongoose.Schema.Types.ObjectId,
        "default": null,
        "ref": "Answer"
    }]
})

module.exports = mongoose.model("User", UserSchema)
