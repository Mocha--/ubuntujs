// app/model/tag.js

// use strict mode
"use strict"

// =================================
// call packages
// =================================
var mongoose = require("mongoose")

// =================================
// call models
// =================================
// .....

// =================================
// schema
// =================================
var TagSchema = mongoose.Schema({
    "name": {
        "type": String,
        "required": true
    }
})


module.exports = mongoose.model("Tag", TagSchema)
