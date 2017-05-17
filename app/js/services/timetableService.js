'use strict';
app.factory('timetableService', function(timeService, $http, $location, storageService, serverService, settingService) {
	function getCurrentSeconds() {
		var date = new Date();

		return date.getHours()*3600 + date.getMinutes()*60;
	}
	function getPercentage(start){
		return (getCurrentSeconds()-start) / (80*60) * 100;
	}
	var isEvenWeek;
	function getCurrentWeek(){
		if(!isEvenWeek){
			Date.prototype.getWeek = function() {
				var date = new Date(this.getTime());
				date.setHours(0, 0, 0, 0);
				date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
				var week1 = new Date(date.getFullYear(), 0, 4);
					return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
		                        - 3 + (week1.getDay() + 6) % 7) / 7);
			}
			isEvenWeek = ((new Date).getWeek() % 2)+1;
		}
		return isEvenWeek;
	}
	return{

		sanitizeToday: function (pairs){
			var sanitized = [];
			
			pairs.forEach(function(item){
				if(+item.number){
					sanitized.push({
						name:item.name,
						teacher:item.teacher,
						classroom:item.classroom,
						start: timeService.getTimeString(item.number).start,
						end: timeService.getTimeString(item.number).end,
						current: (timeService.getTimeStart(item.number) < getCurrentSeconds()
								&& timeService.getTimeStart(item.number) + (81*60) > getCurrentSeconds()) ? true : false,
						value: getPercentage(timeService.getTimeStart(item.number)),
						ended: timeService.getTimeStart(item.number) + (81*60) > getCurrentSeconds() ? false : true
					})
				}else{
					sanitized.push({
						name:item.name,
						teacher:item.teacher,
						classroom:item.classroom
					})
				}
			})
			return sanitized;
		},
		sanitize:function(pairs){
			var sanitized = [];
			pairs.forEach(function(item){
				if(+item.number){
					sanitized.push({
						name:item.name,
						teacher:item.teacher,
						classroom:item.classroom,
						start: timeService.getTimeString(item.number).start,
						end:timeService.getTimeString(item.number).end,
						value: getPercentage(timeService.getTimeStart(item.number)),
						ended: false
					})
				}else{
					sanitized.push({
						name:item.name,
						teacher:item.teacher,
						classroom:item.classroom,
						ended: false
					})
				}
			})
			return sanitized;
		},
		get: function(day){
			self = this;
			/*$http.get(serverService.get()+'/allGroups').then(function(data){
				console.log(data);
			})*/
			var query = serverService.get()+'/pairs?day='+self.getWeekDay(day)+'&group='+JSON.parse(settingService.get().group).index+'&course='+JSON.parse(settingService.get().course).index+'&even='+getCurrentWeek();
			return $http.get(query)
			  .then(function(data){
				if($location.path().slice(1) == self.getCurrentWeekDay()){
					return self.sanitizeToday(data.data);
				}else{
					self.sanitize(data.data)
					return self.sanitize(data.data);
				}
			},
			function(data){
				console.log(data)
				return [{name: 'Произошла ошибка при загрузке данных'}]
			});
			
		},
		getCurrentWeekDay() {
			var days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
			var date = new Date();
			return days[date.getDay()];
		},
		getCurrentWeekDayNum() {
			var date = new Date();
			return date.getDay();
		},
		getWeekDay(string){
			var days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
			return days.indexOf(string);
		}
	}
});