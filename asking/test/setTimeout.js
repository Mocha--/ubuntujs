var async = require("async")

var func1 = function(callback) {
    setTimeout(function() {
        console.log("hehehe")
        callback(null, "hehehe")
    }, 5000)
}

var func2 = function(callback) {
    setTimeout(function() {
        console.log("hahaha")
        callback(null, "hahaha")
    }, 3000)
}

async.series([
    func1,
    func2
], function(err, results) {
    console.log(results)
})
