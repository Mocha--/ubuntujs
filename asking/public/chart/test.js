"use strict"

angular.module("testApp", [])
    .controller("mainCtrl", ["$scope",
        function($scope) {
            $scope.user = {
                "name": "wxb",
                "age": 11
            }

            $scope.$watch("user.name", function(newValue, oldValue, scope) {
                $scope.user.age += 1
                $scope.$emit("ageChange", $scope.user.age)

            })

            $scope.$on("ageChange", function(event, age) {
                console.log("event scope :" + event.targetScope)
                console.log("current value :" + age)
            })

            var ctx = document.getElementById("myChart").getContext("2d")
            var data = {
                "labels": ["January", "February", "March", "April", "May", "June", "July"],
                "datasets": [{
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [65, 59, 80, 81, 56, 55, 40]
                }, {
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [28, 48, 40, 19, 86, 27, 90]
                }]
            };
            var chart = new Chart(ctx).Line(data, {})

            $scope.click = function(){
                chart.datasets[0].points[0].value -= 10
                console.log(chart.datasets[0].points[0].value)
                chart.update()
            }

        }
    ])
