'use strict';
app.controller('startCtrl', function($scope,$location,groupService, storageService){
	$scope.groups = ['2','9'];
	$scope.defaultGroup = groupService.get();
	$scope.selectGroup = function(item){
		groupService.set(item);
	}
	$scope.goToTimetable = function(){
		$location.path('/today')
	}

	$scope.buttonDisabled = function(){

		return 
	}
});