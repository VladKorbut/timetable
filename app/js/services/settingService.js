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
	function parseGroups(data){
		data.forEach(function(item){
			var group = {
    			num: item.groupIndex,
    			index: item.id
    		}
    		groups.push(group);
		})
	}
    function parseCourses(data){
    	data.forEach(function(item, i){
    		var course = {
    			num: item.courseIndex,
    			index: item.id
    		}
    		courses.push(course);
    		parseGroups(item.groupNumbersSet);
    	})
    }
    (function getAllGroupsAndCourses(){
    	$http.get(serverService.get()+'/courses').then(function(data){
			coursesAndGroups = data.data;
			console.log(data.data)
			parseCourses(data.data)
		});
    })();
    var coursesAndGroups = [];
	var courses = [];// = [{num:2, index:1}];
	var groups = [];// = [{num:2, index:1}, {num:9, index:2}];

	console.log(courses, groups)

	var day = $location.path() != '/' ? getNameOfDay() : days[0].name;
	var group  = storageService.get('group') ? storageService.get('group') : JSON.stringify(groups[0]);
	var course = storageService.get('course') ? storageService.get('course') : JSON.stringify(courses[0]);
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