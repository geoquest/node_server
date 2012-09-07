var express = require('express')
  , everyauth = require('everyauth')
  , extAuthConf = require('./conf/extAuthConf')
  , userDB = require('./GQUserDB');

everyauth.debug = true;

var usersById = {};
var nextUserId = 0;


function addUser (source, sourceUser) {
  var user;
  if (arguments.length === 1) { // password-based
    user = sourceUser = source;
    user.id = ++nextUserId;
    return usersById[nextUserId] = user;
  } 
  else { // non-password-based (G+/Facebook)
		if (source == 'facebook'){
			var userEAuth="_FB_" + sourceUser.id;
		  var fNameEAuth = sourceUser.first_name;
		  var lNameEAuth = sourceUser.last_name;
		  var linkEAuth = sourceUser.link;
		} 
		else if(source == 'google'){
			var userEAuth="_G+_" + sourceUser.id;
			var fNameEAuth = sourceUser.given_name;
		    var lNameEAuth = sourceUser.family_name;
		    var linkEAuth = sourceUser.link;
		}
		else{//neither FB/G+ nor login
			//error
		}
		
		//not so sure about this coding style...
		
		userDB.insertNewExternalUser(userEAuth, fNameEAuth, lNameEAuth, linkEAuth, function(err, result){
			if(err){
				return false;
			}
			else{
				if(result){
					//FB/G+ user added
					return true;
					//\todo
					//some thread management here to maintain the connection state?
				}
				else{
					return false;
				}
			}
		});			
		//not sure about this 2 lines...
	user = usersById[++nextUserId] = {id: nextUserId};
    user[source] = sourceUser;
   
  }
  return user;
}

var usersByFbId = {};
var usersByGoogleId = {};
var usersByGoogleHybridId = {};

////everyauth.everymodule
////  .findUserById( function (id, callback) {
////      console.log("facebook/handleRequest everymodule callback reached");
////
////    callback(null, usersById[id]);
////  });
////
////everyauth.facebook
////    .appId(extAuthConf.fb.appId)
////    .appSecret(extAuthConf.fb.appSecret)
////    .findOrCreateUser( function (session, accessToken, accessTokenExtra, fbUserMetadata) {
////      return usersByFbId[fbUserMetadata.id] ||
////        (usersByFbId[fbUserMetadata.id] = addUser('facebook', fbUserMetadata));
////    })
////    .redirectPath('/');
//

//everyauth.google
//    .appId(extAuthConf.google.clientId)
//    .appSecret(extAuthConf.google.clientSecret)
//    .scope('https://www.googleapis.com/auth/userinfo.profile https://www.google.com/m8/feeds/')
//    .findOrCreateUser( function (sess, accessToken, extra, googleUser) {
//    googleUser.refreshToken = extra.refresh_token;
//    googleUser.expiresIn = extra.expires_in;
//    return usersByGoogleId[googleUser.id] || (usersByGoogleId[googleUser.id] = addUser('google', googleUser));
//  })
//  .redirectPath('/');

var express = require("express");
var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', 'views');
  app.engine('html', require('ejs').renderFile);
  app.set("view options", {layout: false});
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser('scrt'));
  app.use(express.session());
  app.use(everyauth.middleware());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname));
  app.use(preEveryauthMiddlewareHack());
  app.use(everyauth.middleware());
  app.use(postEveryauthMiddlewareHack());
});

//app.engine('.html', {
//	  compile: function(str, options){
//	    return function(locals) {
//	 	    var compiled = _.template(str);
//	        return compiled(locals);
//	    };
//	  }
//	});

function preEveryauthMiddlewareHack() {
    return function (req, res, next) {
      var sess = req.session
        , auth = sess.auth
        , ea = { loggedIn: !!(auth && auth.loggedIn) };

      // Copy the session.auth properties over
      for (var k in auth) {
        ea[k] = auth[k];
      }

      if (everyauth.enabled.password) {
        // Add in access to loginFormFieldName() + passwordFormFieldName()
        ea.password || (ea.password = {});
        ea.password.loginFormFieldName = everyauth.password.loginFormFieldName();
        ea.password.passwordFormFieldName = everyauth.password.passwordFormFieldName();
      }

      res.locals.everyauth = ea;

      next();
    };
};

function postEveryauthMiddlewareHack() {
  var userAlias = everyauth.expressHelperUserAlias || 'user';
  return function( req, res, next) {
    res.locals.everyauth.user = req.user;
    res.locals[userAlias] = req.user;
    next();
  };
};


var express = require("express");
var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', 'views');
  app.engine('html', require('ejs').renderFile);
  app.set("view options", {layout: false});
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser('scrt'));
  app.use(express.session());
  app.use(everyauth.middleware());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname));
  app.use(preEveryauthMiddlewareHack());
  app.use(everyauth.middleware());
  app.use(postEveryauthMiddlewareHack());
});



//Shubham added
app.get('/', function(req,res){
	
	if(req.session.user){
		console.log("session present - redirect to home.ejs");
		res.redirect('/home');
	} else {
		console.log("session not present - redirect to login");
		res.redirect('/login');
	}
	
});

//shubham End




app.get('/home', require('./routes/home').home);
app.get('/login', require('./routes/login').login);
//app.get('/login/geoquestUser', require('./routes/login').loginWithGQDB);

app.get('/home/logout', require('./routes/logout').logout);



app.post('/signup', require('./routes/signup').handleSignupPost);
app.get('/signup/geoquestUser', require('./routes/signup').signup);
app.post('/login', require('./routes/login').handleLoginPost);


//everyauth.helpExpress(app); //deprecated. Now not needed

app.listen(3000);

console.log('Go to http://localhost:3000');

module.exports = app;
