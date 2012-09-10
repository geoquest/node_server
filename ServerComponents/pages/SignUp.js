
//var UserRepository = require('../../UserDataAccess');
var User = require("../User");

GeoQuestSignUp = function() {
	this._userRepository = null;
};

/**
 * Receives the User Repository and stores it for later usage.
 * 
 * @param {UserDataAccess.class}
 */
GeoQuestSignUp.prototype.setUserRepository = function(repository)
{
	this._userRepository = repository;
};

GeoQuestSignUp.prototype.handleRequest = function(request, response)
{
	var self = this;
	
	if (request.method === 'GET') {
		response.render('signup.ejs', {msg: "Please fill out the following fields."});
	}
	if (request.method === 'POST') {
				
	    if(request.param('password') == request.param('confirmPassword')){

	    	//password matched
	    	var username = request.param('username');
	    	
	    	self._userRepository.byGeoQuestIdentifier(username, function(userOrNull) {

	    		if (userOrNull === null) {	    			
	    			//user not in DB
	    			
					var password = request.param('password'),
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
					
					self._userRepository.addErrorHandler(function(error) {
		                response.render('signup.ejs', {msg: "Signup failed. Please retry."});
		            });
					
					self._userRepository.insertUser(newGQUser);
		            
	        		request.session.user = newGQUser;

	        		var params = {title: 'GeoQuest Landing Page', msg: 'Welcome ' + username + '!'};
	        		response.render('home.ejs', params);
		          
	    		}
	    		else {
	    			//user already in DB
                    response.render('signup.ejs', {msg: "Username already exists. Please pick another username."});
	    		}
	    	});            
	    }
	    else{
	    	response.render('signup.ejs', {msg: "Password not matched. Please retry."});
	    }        
	}
};

exports.class = GeoQuestSignUp;