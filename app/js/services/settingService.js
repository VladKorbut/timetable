'use strict';
app.factory('settingService', function($location, $routeParams, $http, storageService, serverService) {
	const days = [
        {link:'mon', name: "П"},
        {link:'tue', name: "В"},
        {link:'wed', name: "С"},
        {link:'thu', name: "Ч"},
        {link:'fri', name: "П"},
        {link:'sat', name: "С"}
    ];
	function getNameOfDay(){
		var result;
		days.forEach(function(item){
			if(item.link == $location.path().slice(1)){
				result = item.name;
			}
		});
		return result;
	}

	function getParams(){
		return $routeParams.day;
	}
	
    function parseCourses(data){
    	data.forEach(function(item, i){
    		var course = {
    			number: item.courseIndex,
    			groups: item.groupNumbers.split(',')
    		}
    		courses.push(course);

    	})
    }
    function getAllGroupsAndCourses(){
    	$http.get(serverService.get()+'/get-courses').then(function(data){
			coursesAndGroups = data.data;
			parseCourses(coursesAndGroups);
		});
    };
    var coursesAndGroups = [];
	const courses = [{num:2, index:1}];
	const groups = [{num:2, index:1}, {num:9, index:2}];

	var day = $location.path() != '/' ? getNameOfDay() : days[0].name;
	var group  = storageService.get('group') ? storageService.get('group') : groups[0];
	var course = storageService.get('course') ? storageService.get('course') : courses[0];
	return {
		set: function(num){
			storageService.set('group', num);
			group = num;
		},
		get:function(){
			return{
				course: course,
				group: group,
				day: day
			}
		},
		getCourses: function(){
			return courses;
		},
		getGroups:function(){
			return groups;
		},
		getDays:function(){
			return days;
		},
		setGroup:function(num){
			storageService.set('group', num);
			group = num;
		},
		setCourse:function(num){
			storageService.set('course', num);
			course = num;
		},
		setDay: function(currDay){
			day = currDay;
		},
		getToday: function(){
			return 
		}
	};
 });