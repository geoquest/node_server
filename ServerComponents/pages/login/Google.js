GoogleLogin = function() {
    this._userRepository = null;
};

/**
 * Receives the User Repository and stores it for later usage.
 * 
 * @param {UserDataAccess.class}
 */
GoogleLogin.prototype.setUserRepository = function(repository){
    this._userRepository = repository;
};

GoogleLogin.prototype.handleRequest = function(request, response){
    var self = this;
    var googleUser = request.session.googleUser;
    delete request.session.googleUser;

    if (googleUser) {
        // redirect from facebook
        self._userRepository.byGoogleIdentifier(googleUser['name'], function(userOrNull) {
            var user;
            if(userOrNull === null) {
                user = new User();
                user.setIdentifier(googleUser['name']);
                user.setFirstname(googleUser['given_name']);
                user.setLastname(googleUser['family_name']);
                user.setLoginType("Google");
                self._userRepository.insertUser(user);
            } else {
               user = userOrNull;
            }
            request.session.user = user;
            var params = {title: 'GeoQuest Landing Page', msg: 'Welcome ' + user + '!'};
    		response.render('home.ejs', params);
        });
    } else {
        // page url entered in browser
    	response.redirect(302, '/auth/google');
    }
};

exports.class = GoogleLogin;