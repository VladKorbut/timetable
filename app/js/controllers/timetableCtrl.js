'use strict';
app.controller('timetableCtrl', function($scope, $routeParams,$location, timetableService){
	if($location.path() === '/today'){
		timetableService.getToday().then(
			function(res){
				$scope.pairs = res;
				console.log(res);
			},
			function(res){
				console.log(res);
			}
		);
	}else{
		console.log()
		timetableService.get($routeParams.day).then(
			function(res){
				$scope.pairs = res;
			},
			function(res){
				console.log(res);
			}
		);
	}
	
});