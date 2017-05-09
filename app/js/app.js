'use strict';
var app = angular.module('Timetable', 
	[
	'ngRoute',
	'ngMaterial',
    'ngMaterialSidemenu'
	])
.config(function($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', {
                templateUrl : 'view/start.html',
                controller: 'startCtrl'
            })
            .when('/today', {
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
    $rootScope.current = 'Сегодня';
    $rootScope.days = [
        {link:'today', name: "Сегодня"},
        {link:'mon', name: "Понедельник"},
        {link:'tue', name: "Вторник"},
        {link:'wed', name: "Среда"},
        {link:'thu', name: "Четверг"},
        {link:'fri', name: "Пятница"},
        {link:'sat', name: "Суббота"}
    ]
    $rootScope.redirect = function(link){
        $rootScope.current = link.name;
        $location.path(link.link)
    }
})