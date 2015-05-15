// app.js

"use strict"

// ================================
// main module ----- app
// ================================
angular
    .module("app", [
        "ui.router"
    ])
    // routes config
    .config(["$stateProvider", "$urlRouterProvider",
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/")
            $stateProvider
                .state("login")
                .state("register")
                .state("dashboardList", {
                    "url": "/dashboard",
                    "views": {
                        "": ""
                    }
                })
                .state("dashboardDetail", {
                    "url": "",
                    "views": {
                        "": ""
                    }
                })
        }
    ])

