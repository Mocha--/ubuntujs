// public/javascript/config/apiUrl.js

//use strict mode
"use strict"

// be sure to write http://
var apiHost = "http://localhost:8080"

var apiUrl = {
    "register": apiHost + "/api/register",
    "login": apiHost + "/api/login"
}

angular.module("apiUrlModule", [])
    .constant("REGISTER_URL", apiUrl.register)
    .constant("LOGIN_URL", apiUrl.login)
