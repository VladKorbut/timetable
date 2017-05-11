'use strict';
app.factory('settingService', function(storageService, $location, $routeParams) {
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
	const days = [
        {link:'mon', name: "ПН"},
        {link:'tue', name: "ВТ"},
        {link:'wed', name: "СР"},
        {link:'thu', name: "ЧТ"},
        {link:'fri', name: "ПТ"},
        {link:'sat', name: "СБ"}
    ];
	const courses = [2];
	const groups  = [2,9];


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
		}
	};
 });