'use strict'

angular.module('CloudSight', ['ngRoute','ngMaterial'])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/posters',{
        templateUrl: 'views//posters/posters.html'
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
    .service('wooService', function(){
        let WooCommerce = new WooCommerceAPI({
            url: 'https://placethemoment.com', 
            consumerKey: 'ck_e7619f16de7e3070f846c9b121a6e7be38a987b0',
            consumerSecret: 'cs_9c7e612d493c02126093f6604f14ab789b197ee1',
            wpAPI: true,
            version: 'wc/v3'
        })
        return WooCommerce;
    })
    .directive('operators', function () {
        return {
            templateUrl: 'views/operators.html'
        };
    })
    .controller('posterCtrl', ['$scope','wooService', function($scope, wooService){
        
        wooService.get('orders', function(err, data, res) {
            console.log(res);
        });
        // WooCommerce.getPosters(function(response){
        //     let posters = response.data;
        //     $scope.posters = posters;
        // })
    }])
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
        $scope.newOperator = function(data){
            dataService.createOperator(data);
            $location.path('/operators');
        }
        $scope.reset = function(){
            $scope.add.$setPristine();
            $scope.operator = {};
        }
    });
    // .factory('PTM', function(WooCommerceAPI){
    //     let WooCommerce = new WooCommerceAPI({
    //             url: 'https://placethemoment.com', 
    //             consumerKey: '',
    //             consumerSecret: '',
    //             wpAPI: true,
    //             version: 'wc/v3'
    //         })
    //     return WooCommerce;
    // });