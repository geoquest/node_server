
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
		response.render('signup.ejs');
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
						console.log("SignUp failed.");
						console.log(error);
		                response.render('signupResult.ejs', { title: 'SignUp Failed.', result: 'Please retry.'});
		            });
					
					self._userRepository.insertUser(newGQUser);
		            console.log("SignUp for a new GQUser done");
		            response.render('signupResult.ejs', { title: 'SignUp Succeed.', result: 'Hi, ' +  newGQUser.getFirstname() + '!'});            
	    		}
	    		else {
	    			//user already in DB
                    console.log("SignUp failed.");
                    response.render('signupResult.ejs', { title: 'SignUp Failed.', result: 'This Username already existed.'});
	    			
	    		}
	    	});            
	    }
	    else{
	    	response.render('signupResult.ejs', { title: 'Password not matched.', result: 'Please retry.'});
	    }        
	}
};

exports.class = GeoQuestSignUp;