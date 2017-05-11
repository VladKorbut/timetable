'use strict';
app.factory('timetableService', function(timeService, $http, $location, storageService) {
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

		sanitizeToday: function (pairs){
			var sanitized = [];
			
			pairs.forEach(function(item){
				sanitized.push({
					name:item.name,
					teacher:item.teacher,
					classroom:item.classroom,
					start: timeService.getTimeString(item.number).start,
					end:timeService.getTimeString(item.number).end,
					current: (timeService.getTimeStart(item.number) < getCurrentSeconds()
							&& timeService.getTimeStart(item.number) + (80*60) > getCurrentSeconds()) ? true : false,
					value: getPercentage(timeService.getTimeStart(item.number)),
					ended: timeService.getTimeStart(item.number) + (81*60) > getCurrentSeconds() ? false : true
				})
			})
			return sanitized;
		},
		sanitize:function(pairs){
			var sanitized = [];
			pairs.forEach(function(item){
				sanitized.push({
					name:item.name,
					teacher:item.teacher,
					classroom:item.classroom,
					start: timeService.getTimeString(item.number).start,
					end:timeService.getTimeString(item.number).end,
					value: getPercentage(timeService.getTimeStart(item.number)),
					ended: false
				})
			})
			return sanitized;
		},
		get: function(day){
			self = this;
			if($location.path().slice(1) == getCurrentWeekDay()){
				return $http.get('api/today.json').then(function(data){
					return self.sanitizeToday(data.data);
				});
			}else{
				return $http.get('api/'+day+'.json').then(function(data){
					return self.sanitize(data.data);
				});
			}
			
		}
	}
});