// public/js/service/authService.js

// use strict mode
"use strict"

angular.module("authModule", [])
    .factory("tokenService", ["$window", function($window) {
        return {
            // some operations ralated to token
            setToken: function(token) {
                $window.localStorage.setItem("token", token)
            },
            getToken: function() {
                return $window.localStorage.getItem("token")
            },
            removeToken: function() {
                $window.localStorage.removeItem("token")
            }
        }
    }])
    .factory("authService", ["$http", "tokenService", "REGISTER_URL", "LOGIN_URL",
        function($http, tokenService, REGISTER_URL, LOGIN_URL) {
            return {
                // login , register , logout
                register: function(user) {
                    return $http.post(REGISTER_URL, user)
                },
                login: function(user) {
                    if (this.isAuthed()) {
                        tokenService.removeToken()
                    }
                    return $http.post(LOGIN_URL, user)
                },
                logout: function() {
                    tokenService.removeToken()
                },
                isAuthed: function() {
                    if (tokenService.getToken()) {
                        return true
                    } else {
                        return false
                    }
                }
            }
        }
    ])
    .factory("authInterceptor", ["tokenService", "$injector",
        function(tokenService , $injector) {
            return {
                request: function(config) {
                    var token = tokenService.getToken()
                    if (token) {
                        config.headers["Authorization"] = token
                    }
                    return config
                },

                response: function(response) {
                    var $state = $injector.get("$state")
                    if (response.status == 403) {
                        //$location.path("/login")
                        $state.go("home")
                    }
                    return response
                }
            }
        }
    ])
