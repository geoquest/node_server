
var UserRepository = require('../../UserDataAccess');

GeoQuestLogin = function() {
	this._userRepository = null;
};

/**
 * Receives the User Repository and stores it for later usage.
 * 
 * @param {UserDataAccess.class}
 */
GeoQuestLogin.prototype.setUserRepository = function(repository)
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
GeoQuestLogin.prototype.handleRequest = function(request, response)
{
	if (request.method === 'GET') {
		var params = { title: 'GeoQuest Author Management' , msg: 'login using your GeoQuest account'};
		response.render('login.ejs', params);
	}
	
	if (request.method === 'POST') {
		var username = request.param('username');
        var rawPassword = request.param('password');
        
        this._userRepository.byGeoQuestIdentifier(username, function(userOrNull) {
        	if (userOrNull === null) {
        		response.render('login.ejs', { title: 'GeoQuest Author Management', msg: 'User not found. Please sign up.'});
        		return;
        	}
        	var user = userOrNull;
        	if (user.hasPassword(rawPassword)) {
        		// Credentials are correct, therefore store the user in the session.
        		request.session.user = user;
        		
        		//login behaviour change
        		response.redirect('/games?showDialog=true');
        		
        	} else {
        		// Wrong password provided.
        		response.render('login.ejs', { title: 'GeoQuest Author Management.', msg: 'Log in Failed. Please retry.'});
        	}
        });
	}
};

exports.class = GeoQuestLogin;