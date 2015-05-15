// js/service/chartService.js

// use strict
"use strict"

angular.module("chartModule", [])
    .factory("chartService", [function() {
        var chartCtx = document.getElementById("myChart").getContext("2d")
        return {
            "chart": new Chart()

        }
    }])
