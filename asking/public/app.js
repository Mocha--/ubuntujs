// public/app.js

// use strict mode
"use strict"

angular
    .module("askingApp", [
        "ui.router",
        "navModule",
        "apiUrlModule"
    ])
    .config(["$stateProvider", "$urlRouterProvider",
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/")
            $stateProvider
                .state("home", {
                    "url": "/",
                    "views": {
                        "nav": {
                            "templateUrl": "html/nav.html",
                            "controller": "navCtrl"
                        },
                        "container": {
                            "templateUrl": "html/home.html",
                            "controller": ""
                        }
                    }
                })
        }
    ])
    .config(["$httpProvider", function($httpProvider) {
        $httpProvider.interceptors.push("authInterceptor")
    }])
