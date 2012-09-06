
var UserRepository = require('../../UserDataAccess');

GeoQuestLogin = function() {
	this.connection = null;
};

/**
 * Receives the MongoDB connection and stores it for later usage.
 * 
 * @param {Object}
 */
GeoQuestLogin.prototype.setDatabaseConnection = function(connection)
{
	this.connection = connection;
};

GeoQuestLogin.prototype.handleRequest = function(request, response)
{
	if (request.method === 'GET') {
		var params = { title: 'Log In' , msg: 'login using your GeoQuest account'};
		response.render('login', params);
	}
	if (request.method === 'POST') {
		var username = req.param('username');
        var rawPassword = req.param('password');
        
        var repository = new UserRepository.class(this.connection);
        repository.byGeoQuestIdentifier(username, function(userOrNull) {
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