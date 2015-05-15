// js/controller/navController.js

// use strict mode
"use strict"

angular.module("navModule", [
        "authModule"
    ])
    .controller("navCtrl", ["authService", "$scope",
        function(authService, $scope) {
            $scope.login = {
                "username": "",
                "password": ""
            }

            $scope.register = {
                "username": "",
                "password": ""
            }

            $scope.registerClick = function() {
                authService.register($scope.register)
                    .success(function(res) {
                        console.log(res)
                    })
            }

            $scope.loginClick = function() {
                authService.login($scope.login)
                    .success(function(res) {
                        console.log(res)
                    })
            }
        }
    ])
