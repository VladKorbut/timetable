'use strict';
app.factory('timeService', function() {
	function genTimeInSeconds(str){
		var time = str.split(':');
		return (3600*+time[0] + 60*+time[1])
	}
	const pairs = {
		1: {start:'08:15',end:'09:35'},
		2: {start:'09:45',end:'11:05'},
		3: {start:'11:15',end:'12:35'},
		4: {start:'13:00',end:'14:20'},
		5: {start:'14:30',end:'15:50'},
		6: {start:'16:00',end:'17:20'}
	}
	return {
		getTimeStart:function(num){
			return genTimeInSeconds(pairs[num].start);
		},
		getTimeString: function(num){
			return pairs[num];
		}
	}
 });