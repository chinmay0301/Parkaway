var app = angular.module('Parkaway', ['ngRoute','ngResource','google-maps']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/pass.html',
            controller: 'PassCheck'
        })
        .when('/home', {
            templateUrl: 'partials/home.html',
            controller:  'AddCarno'
        })
        .when('/rank', {
        	templateUrl: 'partials/rank.html',
        	controller:  'ShowBill'
        })
        .when('/admin', {
          templateUrl: 'partials/admin_login.html',
          controller:  'AdminLogin'
        })
        .when('/admin_user', {
          templateUrl: 'partials/admin.html',
          controller: 'MapController'
        })
        .when('/user', {
          templateUrl: 'partials/user_req.html',
          controller: 'UserControl'
        })
        .when('/locker', {
          templateUrl: 'partials/locker.html',
          controller: 'LockerControl'
        })
        .when('/map_seg', {
          templateUrl: 'partials/map_seg.html',
          controller: 'MapSegController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

 app.directive('fileModel', ['$parse', function ($parse) {
        return {
           restrict: 'A',
           link: function(scope, element, attrs) {
              var model = $parse(attrs.fileModel);
              var modelSetter = model.assign;

              element.bind('change', function(){
                 scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                 });
              });
           }
        };
     }]);

     app.service('fileUpload', ['$http', function ($http) {
        this.uploadFileToUrl = function(file, uploadUrl){
           var fd = new FormData();
           fd.append('file', file);

           $http.post(uploadUrl, fd, {
              transformRequest: angular.identity,
              headers: {'Content-Type': undefined}
           })

           .success(function(){
           console.log('file uploaded successfully');          
           })

           .error(function(){
           });
        }
     }]);


var obj1 = {};

// var cities = [
//               {
//                   place : 'India',
//                   desc : 'awesomeness',
//                   lat : 23.200000,
//                   long : 79.225487
            
//               }];
             

app.controller('UserControl', function($scope, $resource, $window, $location){

  $scope.submit =function(params) {
    $scope.show = true;
    
    var user = $resource('/api/insert_user/'+params.car_num + '/' +params.phone_num);
          user.get(function(user){
            console.log('inserted in userdata base'); 
          });
     }
    
    
});      



app.controller('LockerControl', function($scope, $resource, $window, $location){
   var list = $resource('/api/insert_user/locker_status');
              list.get(function(list) {
              $scope.list = list;
              });
     $scope.toggle = function()
     {
      $location.path('/admin_user');
     }

});       
         
app.controller('MapController', function ($scope,$resource,$window,$location) {    
              
                var list = $resource('/api/insert_user/');
              list.get(function(list) {
              $scope.list = list;
              });


              $scope.toggle = function()
              {
                $scope.map_show = !$scope.map_show; 
              } 
                  
              $scope.locker_redirect = function ()
              {
                $location.path('/locker');
              }    
              $scope.lock = false;
              var mapOptions = {
                  zoom: 4,
                  center: new google.maps.LatLng(25,80),
                  mapTypeId: google.maps.MapTypeId.ROADMAP
              }


             
              $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

              $scope.markers = [];
              
              var infoWindow = new google.maps.InfoWindow();
              
              var createMarker = function (info){
                  var color = "test"; 
                  if(info.open)
                  {
                    color = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                  }
                  else 
                    color = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                  var marker = new google.maps.Marker({
                      map: $scope.map,
                      position: new google.maps.LatLng(info.latitude, info.longitude),
                      title: 'Lock: ' + info.id,
                      icon: color
                  });
                  marker.content = '<div class="infoWindowContent">' + 'Battery left: ' + info.battery + '<br />'+ 'Lock Id: ' + info.id + '<br />' + info.latitude + ' N,' + info.longitude +  ' E,' + '<br />' + 'Lock Open: ' + info.open + '</div>';
                  
                  google.maps.event.addListener(marker, 'click', function(){
                      infoWindow.setContent('<h2>' + marker.title  + '</h2>' + 
                        marker.content);
                      infoWindow.open($scope.map, marker);
                  });
                  
                  $scope.markers.push(marker);
                  
              }  

               var cities = [];
          var user = $resource('/api/insert_admin/');
          user.get(function(user){
          var len = Object.values(user).length-2;
            //console.log(Object.keys(user).length);
            for( i=0; i<len; i++)
            { 
            cities.push(user[i]);
            console.log(typeof(cities[i])); 
            }
            console.log(len);
             for (i = 0; i < len; i++){
                  console.log('creating marker');
                  createMarker(cities[i]);
                  console.log(cities[i]);
              }
          });
             

              $scope.openInfoWindow = function(e, selectedMarker){
                  e.preventDefault();
                  google.maps.event.trigger(selectedMarker, 'click');
              }
             
           $scope.submit = function(params) {
            var lock_num = params.lock_id; 
            var command = $resource('/api/gprs/'+lock_num); 
            command.get(function(user) {
              console.log('umm Yeah');
            });
            console.log('unlocked the lock with lock id ' + lock_num);
            $scope.lock = true; 
           }
         
         $scope.submit_sms = function(params) {
          var unlocker_id = params.unlocker_id;
          var phone_num = params.phone_num;
          console.log('entering into submit sms');
          var user = $resource('/api/gprs/' + unlocker_id + '/' + phone_num);
          user.get(function(user){
            console.log('sending sms to unlocker and user');
          });
         } 
         
         
          });
app.controller('PassCheck', ['$scope', '$resource', '$location', '$window',
  
  function($scope, $resource, $location, $window) {
    $scope.verify = function(params) {
    if (params.pass ==='123')
    {
      $location.path('/home');
    }
   }}]);


app.controller('AdminLogin', ['$scope', '$resource', '$location', '$window',
  
  function($scope, $resource, $location, $window) {
    $scope.verify = function(params) {
    if (params.pass ==='123')
    {
      $location.path('/admin_user');
      console.log('admin login successful');
    }
   }}]);


app.controller('AddCarno', ['$scope', '$resource', '$location', '$window', 'fileUpload',
	
   function($scope, $resource, $location, $window, fileUpload){
    $scope.show = false;
   
   
   function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
      } 
    else { 
        console.log("Geolocation is not supported by this browser.");
      }
    }
    
    function showPosition(position) {
      
      obj1.latitude = position.coords.latitude; 
      obj1.longitude = position.coords.longitude;
      //console.log('latitude'+obj1.latitude);
      //console.log('longitude'+obj1.longitude);
      //console.log(obj1);  
    }
    getLocation();
    
    $scope.submit =function(params) {
      //console.log(params.car_num);
      //console.log(params.id_lock);
      //console.log(obj1);
      var latitude = obj1.latitude;
      var longitude =obj1.longitude;
      //console.log('latitude' + obj1.latitude);
    $scope.show = true;
		
    var user = $resource('/api/insert/'+params.car_num + '/' +params.id_lock +'/' +latitude +'/' +longitude +'/' +params.id_locker);
          user.get(function(user){
          	console.log('user car_num' + user.car_num);
          	$scope.user = user;
          });
     
    
    

		}
   $scope.view = function(params) {
   	$location.path('/rank');
   
   }
    
    $scope.uploadFile = function(){
           var file = $scope.myFile;
           var uploadUrl = '/api/insert/';
           fileUpload.uploadFileToUrl(file, uploadUrl);
        };

  }]);

app.controller('ShowBill', ['$scope', '$resource', '$location', '$window',

	function($scope, $resource, $location, $window) {
	$scope.submit = function(params) {
		console.log(params.car_num);
		$scope.show = true;
     var user = $resource('/api/fine_gen/' + params.car_num);
     user.get(function(user) {
      console.log('user found');
     	$scope.user = user;
     });

	}

  $scope.paid = function(params) { 
     var user = $resource('/api/pay/' + params.car_num +'/' + params.id_unlocker);
     user.get(function(user) {
      console.log('user got');
      $scope.user = user 
      $scope.show_1 = true;
     var command = $resource('/api/gprs/' + user.id_lock);
     command.get(function(user1){
      console.log('sending sms to server that lock is to be opened');
     });
     });

  }


	}]);