'use strict'

angular.module('CloudSight', ['ngRoute','ngMaterial'])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/posters',{
        templateUrl: 'views/posters/posters.html'
    })
    .when('/operators',{
        templateUrl: 'views/operators/operators.html'
    })
    .when('/operators/add',{
        templateUrl: 'views/operators/add.html'
    })
    .otherwise({
        redirectTo: '/'
    });

    $locationProvider.hashPrefix('');
    // $locationProvider.html5Mode({
    //   enabled: true,
    //   requireBase: false
    // });
    })
    .directive('operators', function () {
        return {
            templateUrl: 'views/operators.html'
        };
    })    
    .controller('operatorCtrl', function ($scope, dataService) {
        dataService.getOperators(function (response) {
            let operators = response.data;
            $scope.operators = operators.operators;
        });

        $scope.refresh = function(){
          dataService.getOperators(function (response) {
            let operators = response.data;
            $scope.operators = operators.operators;
        });
        }
    })
    .controller('newOperatorCtrl', function($scope, $location, dataService){
        $scope.operator = dataService.getOperatorById();
        $scope.newOperator = function(data){
            dataService.createOperator(data);
            $location.path('/operators');
        }
        $scope.reset = function(){
            $scope.add.$setPristine();
            $scope.operator = {};
        }
    })
    .controller('posterCtrl', function($scope, wcService){
      wcService.getPosters(function(response){
        let posters = response.data;
        $scope.posters = posters;
      });
      $scope.getDataSet = function(){
        console.log($scope.posters);
        // return JSON.parse([{ 'json': 'test' }]);
        // return new Blob([JSON.stringify({ json: 'test' }, null, 2)], {type : 'application/json'});
      }
      $scope.getPrintPoster = function(poster){
        let orderId = poster.id;
        let url = poster.line_items[0].meta_data[11].value;
        let regex = /"(.*?)"/gi;
        url = url.match(regex);
        let highresUrl = url[0].slice(1,-1);

        fetch(highresUrl)
          .then(resp => resp.blob())
          .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = orderId+'.png';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
          })
          .catch(() => alert('Probleem bij het ophalen..'));        
      }
    });