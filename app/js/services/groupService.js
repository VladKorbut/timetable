'use strict';
app.factory('groupService', function(storageService) {
	var group;
	return {
		set: function(num){
			storageService.set('group', num);
			group = num;
		},
		get:function(){
			if (!group){
				group = storageService.get('group');
			}
			return group;
		}
	};
 });