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
app.run(function($location, $rootScope, settingService){
    function getWeekday(){
        var d = new Date();
        return d.getDay();
    }
    $rootScope.$on('$routeChangeStart', function(next, current) { 
        if($location.path() == '/'){
            if(getWeekday() > 0){
                $location.path(settingService.getDays()[getWeekday()-1].link);
            }
            else{
                $location.path(settingService.getDays()[0].link);
            }
        }
    });
})
