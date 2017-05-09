'use strict';
app.factory('timetableService', function(timeService, storageService, $http) {
	function getCurrentSeconds() {
		var date = new Date();

		return date.getHours()*3600 + date.getMinutes()*60;
	}
	function getPercentage(start){
		return (getCurrentSeconds()-start) / (80*60) * 100;
	}
	function getCurrentWeekDay() {
		var days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
		var date = new Date();
		return days[date.getDay()];
	}
	return{
		sanitize:function(pairs){
			var sanitized = [];
			pairs.forEach(function(item){
				sanitized.push({
					name:item.name,
					teacher:item.teacher,
					classroom:item.classroom,
					time: timeService.getTimeString(item.number),
					value: getPercentage(timeService.get(item.number))
				})
			})
			return sanitized;
		},
		sanitizeAll: function (pairs){
			var sanitized = [];
			pairs.forEach(function(item){
				if(timeService.get(item.number) + (80*60) > getCurrentSeconds()){
					sanitized.push({
						name:item.name,
						teacher:item.teacher,
						classroom:item.classroom,
						time: timeService.getTimeString(item.number),
						current: (timeService.get(item.number) < getCurrentSeconds()
								&& timeService.get(item.number) + (80*60) > getCurrentSeconds()) ? true : false,
						value: getPercentage(timeService.get(item.number))
					})
				}
			})
			return sanitized;
		},
		getToday: function(){
			self = this;
			console.log(getCurrentWeekDay());
			return $http.get('api/today.json').then(function(data){
				return self.sanitizeAll(data.data);
			});
		},
		get:function(day){
			self = this;
			return $http.get('api/'+day+'.json').then(function(data){
				return self.sanitize(data.data);
			});
		}
	}
});