
var UserRepository = require('../../UserDataAccess'); 
var everyauth = require('everyauth');
var extAuthConf = require('../../conf/extAuthConf');

everyauth.debug = true;

FacebookLogin = function() {
    this._userRepository = null;
};

/**
 * Receives the User Repository and stores it for later usage.
 * 
 * @param {UserDataAccess.class}
 */
FacebookLogin.prototype.setUserRepository = function(repository){
    this._userRepository = repository;
};

FacebookLogin.prototype.handleRequest = function(request, response){
    //console.log(request.user);
    var self = this;
    console.log("facebook/handleRequest reached");
    var facebookUser = request.session.facebookUser;
    delete request.session.facebookUser;
    //console.log(request.session);
    if (facebookUser) {
        // redirect from facebook
        var user;
        self._userRepository.byFacebookIdentifier(facebookUser['username'], function(userOrNull){
            
            console.log("facebook/handleRequest facebook callback reached");
            if(userOrNull === null){
                user = new User();
                user.setIdentifier(facebookUser['username']);
                user.setFirstname(facebookUser['first_name']);
                user.setLastname(facebookUser['last_name']);
                user.setLoginType("Facebook");
                self._userRepository.insertUser(user);
            } else {
               user = userOrNull;
            }
            request.session.user = user;
            console.log(user.toJSON());
            response.write("login succeeded" + user.getFirstname());
            
        });
        
        
    } else {
        console.log("EEEEEEEEEEEEEEELLLLLLLLLLLLLLLLLLSSSSSSSSSSSSSSSSEEEEEEEEEEEEEEEEEEE");
        // page url entered in browser
        
    }
    response.render('login.ejs', { title: 'Log in Succeed.', msg: ('Hi, ' +  '!')} );
};



exports.class = FacebookLogin;