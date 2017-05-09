'use strict';
var app = angular.module('Timetable', 
	[
	'ngRoute',
	'ngMaterial',
    'ngMaterialSidemenu'
	])
.config(function($routeProvider, $locationProvider) {

        $routeProvider
            /*.when('/', {
                templateUrl : 'view/start.html',
                controller: 'startCtrl'
            })*/
            .when('/', {
                templateUrl : 'view/timetable.html',
                controller: 'timetableCtrl'
            })
            .when('/:day',{
                templateUrl : 'view/timetable.html',
                controller: 'timetableCtrl'
            })

        $locationProvider.html5Mode(true);
    });

app.run(function($rootScope, $location){
    
})