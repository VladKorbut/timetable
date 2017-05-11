'use strict';
app.controller('timetableCtrl', function($scope, $routeParams,$location, timetableService){
	timetableService.get($routeParams.day).then(
		function(res){
			$scope.pairs = res;
		},
		function(res){
			console.error(res);
		}
	);
});