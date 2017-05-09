'use strict';
app.factory('groupService', function(storageService) {
	const courses = [2];
	const groups  = [2,9];

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
				group: group
			}
		},
		getCourses: function(){
			return courses;
		},
		getGroups:function(){
			return groups;
		},
		setGroup:function(num){
			storageService.set('group', num);
			group = num;
		},
		setCourse:function(num){
			storageService.set('course', num);
			course = num;
		}
	};
 });