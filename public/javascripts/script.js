var app = angular.module('DR_list', ['ngRoute','ngResource']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller:  'AddRollno'
        })
        .when('/rank', {
        	templateUrl: 'partials/rank.html',
        	controller:  'ShowRank'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);


app.controller('AddRollno', ['$scope', '$resource', '$location', '$window',
	
   function($scope, $resource, $location, $window){
   
		$scope.submit =function(params) {
      console.log(params.roll_num);
      console.log(params.cpi);
			$scope.show = true;
		var user = $resource('/api/insert/'+params.cpi + '/' +params.roll_num);
          user.get(function(user){
          	console.log('user cpi is' + user.cpi);
          	$scope.user = user;
          });

		}
   $scope.view = function(params) {
   	$location.path('/rank');
   
   }
  }]);

app.controller('ShowRank', ['$scope', '$resource', '$location', '$window',

	function($scope, $resource, $location, $window) {
	$scope.submit = function(params) {
		console.log(params.roll_num);
		$scope.show = true;
     var user = $resource('/api/view_dr/' + params.roll_num);
     user.get(function(user) {
        console.log('user rank is' + user.rank);
     	$scope.user = user;
     })

	}
	}]);