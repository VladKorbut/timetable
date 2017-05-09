'use strict';
app.factory('settingService', function() {
	var course;
	var group;
	return {
		setCourse:function(item){
			this.course = item;
		},
		setGroup:function(item){
			this.group = item;
		},
		set: function(course, group){
			setCourse(course);
			setGroup(group);
		},
		getCourse:function(){
			return course;
		},
		getGroup:function(){
			return group;
		}

	}
});