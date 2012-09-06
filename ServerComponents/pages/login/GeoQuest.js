
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

GeoQuestLogin.prototype.handleRequest = function(request, response)
{
	if (request.method === 'GET') {
		var params = { title: 'Log In' , msg: 'login using your GeoQuest account'};
		response.render('login.ejs', params);
	}
	if (request.method === 'POST') {
		var username = request.param('username');
        var rawPassword = request.param('password');
        
        this._userRepository.byGeoQuestIdentifier(username, function(userOrNull) {
        	if (userOrNull === null) {
        		response.render('login.ejs', { title: 'Log in Failed.', msg: 'Please retry.'});
        		return;
        	}
        	var user = userOrNull;
        	if (user.hasPassword(rawPassword)) {
        		// Credentials are correct.
        		response.render('login.ejs', { title: 'Log in Succeed.', msg: 'Hi, ' +  user.getFirstname() + '!'});
        		// TODO: store in session, perhaps display another page
        	} else {
        		// Wrong password provided.
        		response.render('login.ejs', { title: 'Log in Failed.', msg: 'Please retry.'});
        	}
        });
	}
};

exports.class = GeoQuestLogin;