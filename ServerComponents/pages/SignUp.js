
//var UserRepository = require('../../UserDataAccess');
var User = require("../User");

GeoQuestLogout = function() {
	this._userRepository = null;
};

/**
 * Receives the User Repository and stores it for later usage.
 * 
 * @param {UserDataAccess.class}
 */
GeoQuestLogout.prototype.setUserRepository = function(repository)
{
	this._userRepository = repository;
};

GeoQuestLogout.prototype.handleRequest = function(request, response)
{
	if (request.method === 'GET') {
		response.render('signup.ejs');
	}
	if (request.method === 'POST') {
				
	    if(request.param('password') == request.param('confirmPassword')){

			var username = request.param('username'),
				password = request.param('password'),
				firstName = request.param('fName'),
				lastName = request.param('lName'),
				email = request.param('email');
			
			var newGQUser = new User.class();
			newGQUser.setLoginType("GeoQuest");
			newGQUser.setIdentifier(username);
			newGQUser.setPassword(password);
			newGQUser.setFirstname(firstName);
			newGQUser.setLastname(lastName);
			newGQUser.setEmail(email);
			this._userRepository.insertUser(newGQUser);
            console.log("SignUp for a new GQUser done");
            response.render('signupResult.ejs', { title: 'SignUp Succeed.', result: 'Hi, ' +  newGQUser.getFirstname() + '!'});
            
	    }
	    else{
	    	response.render('signupResult.ejs', { title: 'Password not matched.', result: 'Please retry.'});
	    }        
	}
};

exports.class = GeoQuestLogout;