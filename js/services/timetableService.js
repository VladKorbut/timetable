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

		sanitizeToday: function (pairs){
			console.log(pairs)
			var sanitized = [];
			pairs.forEach(function(item){
				if(timeService.getTimeStart(item.number) + (81*60) > getCurrentSeconds()){
					sanitized.push({
						name:item.name,
						teacher:item.teacher,
						classroom:item.classroom,
						start: timeService.getTimeString(item.number).start,
						end:timeService.getTimeString(item.number).end,
						current: (timeService.getTimeStart(item.number) < getCurrentSeconds()
								&& timeService.getTimeStart(item.number) + (80*60) > getCurrentSeconds()) ? true : false,
						value: getPercentage(timeService.getTimeStart(item.number))
					})
				}
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
					value: getPercentage(timeService.getTimeStart(item.number))
				})
			})
			return sanitized;
		},
		getToday: function(){
			self = this;
			console.log(getCurrentWeekDay());
			return $http.get('api/today.json').then(function(data){
				return self.sanitizeToday(data.data);
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