
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
		if(request.cookies.user == undefined || request.cookies.pass == undefined){
			var params = { title: 'GeoQuest Author Management' , msg: 'login using your GeoQuest account'};
			response.render('login.ejs', params);
		} else {
			//\todo: redirect to the landing page like 
			//response.render('home.ejs', {title :'test' , msg: 'Welcome, ' +  user.getFirstname() + '!'});
		}
		
	}
	if (request.method === 'POST') {
		
		console.log('handling login post request');
		
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
        		
        		response.cookie('user', user.getIdentifier(), {maxAge : 900000});
        		response.cookie('pass', user.getPassword(), {maxAge : 900000});
        		
        		var params = {title: 'GeoQuest Landing Page', msg: 'Welcome ' + username + '!'};
        		response.render('home.ejs', params);
        	} else {
        		// Wrong password provided.
        		response.render('login.ejs', { title: 'GeoQuest Author Management.', msg: 'Log in Failed. Please retry.'});
        	}
        });
	}
};

exports.class = GeoQuestLogin;