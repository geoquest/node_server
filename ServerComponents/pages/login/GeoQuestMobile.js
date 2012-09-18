
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
	if (request.method == 'POST') {
		var data = request.body;		 
		var username = data['username'];
        var rawPassword = data['password'];
        this._userRepository.byGeoQuestIdentifier(username, function(userOrNull) {
        	if (userOrNull === null) {
        		var responseText = {'success':false,  'msg': 'User not found.'};
        		response.write(JSON.stringify(responseText));
        		response.end();
        		return;
        	}
        	var user = userOrNull;
        	if (user.hasPassword(rawPassword)) {
        		// Credentials are correct, therefore store the user in the session.
        		var givenUser = user.toJSON();
        		delete givenUser.password;
        		delete givenUser._id;
        		var responseText = {'success':true,  'msg': 'Welcome ' + user + '!', fullUser: givenUser};
        		response.write(JSON.stringify(responseText));
        		request.session.user = user;
        		response.end();
        	} else {
        		// Wrong password provided.
        		var responseText = {'success':false,  'msg': 'Wrong password. Please retry.'};
        		response.write(JSON.stringify(responseText));
        		response.end();
        	}
        });
	}
};

exports.class = GeoQuestMobileLogin;