'use strict'

angular.module('CloudSight')
.service('dataService', function($http, $q){
    this.getOperators = function(cb) {
        $http.get('/api/operators')
        .then(cb);
    }
    this.createOperator = function(data){
        $http.post('/api/operators', data);
    }
})
.service('wcService', function($http){
  this.getPosters = function(cb) {
    $http.get('/api/posters')
    .then(cb);
  }
})