
var UserRepository = require('../../UserDataAccess');

GeoQuestMobileLogin = function() {
	this._userRepository = null;
};

/**
 * Receives the User Repository and stores it for later usage.
 * 
 * @param {UserDataAccess.class}
 */
GeoQuestMobileLogin.prototype.setUserRepository = function(repository)
{
	this._userRepository = repository;
};

/**
 * Concerns with the login procedure of GeoQuest users.
 * 
 * On GET request the login form will be presented.
 * If a POST request is received, then this module
 * uses the provided credentials to perform a login
 * attempt.
 * 
 * @param {Object} request
 * @param {Object} response
 */
GeoQuestMobileLogin.prototype.handleRequest = function(request, response) {
	console.log("got to the handleRequest " + request.method);
	if (request.method == 'POST') {
		var data = request.body;		 
		var username = data['username'];
        var rawPassword = data['password'];
        
        console.log( );
        
        this._userRepository.byGeoQuestIdentifier(username, function(userOrNull) {
        	if (userOrNull === null) {
        		//console.log(username + "   " +rawPassword+"   user not found");
        		responseText = {'success':false,  'msg': 'User not found.'};
        		response.setHeader("Content-Type", "application/json;charset=UTF-8");
        		response.write(JSON.stringify(responseText));
        		response.end();
        		return;
        	}
        	var user = userOrNull;
        	if (user.hasPassword(rawPassword)) {
        		console.log(username + "   " +rawPassword+"   LOGIN Attempt Successful!!!!");
        		// Credentials are correct, therefore store the user in the session.  
        		responseText = {'success':true,  'msg': 'Welcome ' + user + '!', fullUser: user.toJSON()};
        		response.setHeader("Content-Type", "application/json;charset=UTF-8");
        		response.write(JSON.stringify(responseText));
        		request.session.user = user;
        		console.log(request.session.user);
        		response.end();
        	} else {
        		// Wrong password provided.
        		//console.log(username + "   " +rawPassword  + "   wrong password");
        		responseText = {'success':false,  'msg': 'Wrong password. Please retry.'};
        		response.setHeader("Content-Type", "application/json;charset=UTF-8");
        		response.write(JSON.stringify(responseText));
        		response.end();
        	}
        });
	}
};

exports.class = GeoQuestMobileLogin;