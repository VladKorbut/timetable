'use strict';
app.factory('serverService', function() {
	const host = 'http://localhost';
	const port = 8080;
	return {
		get: function(){
			return host+':'+port;
		}
	}
});