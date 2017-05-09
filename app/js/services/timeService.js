'use strict';
app.factory('timeService', function() {
	function genTimeInSeconds(str){
		var time = str.split(':');
		return (3600*+time[0] + 60*+time[1])
	}
	const pairs = {
		1: '08:45',
		2: '09:45',
		3: '11:15',
		4: '13:00',
		5: '14:30',
		6: '16:00'
	}
	return {
		get:function(num){
			return genTimeInSeconds(pairs[num]);
		},
		getTimeString: function(num){
			return pairs[num];
		}
	}
 });