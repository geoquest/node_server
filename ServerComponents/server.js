<<<<<<< HEAD
var express = require('express')
  , everyauth = require('everyauth')
  , conf = require('./conf')
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
  } else { // non-password-based (G+/Facebook)
	if (source == 'facebook'){
		var userEAuth="_FB_" + sourceUser.id;
		
		//\todo
		//Here first do a query on the DB to check if userEAuth exists
		
		//if not do a db insertion
		console.log(userEAuth);
	    console.log(sourceUser.id);
	    console.log(sourceUser.first_name);
	    console.log(sourceUser.last_name);
	} 
	else if(source == 'google'){
		var userEAuth="_G+_" + sourceUser.id;
		
		//\todo
		//Here first do a query on the DB to check if userEAuth exists
		
		//if not do a db insertion
		
		console.log(userEAuth);
	    console.log(sourceUser.id);
	    console.log(sourceUser.given_name);
	    console.log(sourceUser.family_name);
	    
	    
	    
	}
	else{
		//error
	}
	  
    user = usersById[++nextUserId] = {id: nextUserId};
    user[source] = sourceUser;
    
    console.log('Now in addUser');

    
   
  }
  return user;
}

var usersByFbId = {};
var usersByGoogleId = {};
var usersByGoogleHybridId = {};

everyauth.everymodule
  .findUserById( function (id, callback) {
    callback(null, usersById[id]);
  });

everyauth
  .facebook
    .appId(conf.fb.appId)
    .appSecret(conf.fb.appSecret)
    .findOrCreateUser( function (session, accessToken, accessTokenExtra, fbUserMetadata) {
	  console.log('test fb');
      return usersByFbId[fbUserMetadata.id] ||
        (usersByFbId[fbUserMetadata.id] = addUser('facebook', fbUserMetadata));
    })
    .redirectPath('/');

everyauth.google
  .appId(conf.google.clientId)
  .appSecret(conf.google.clientSecret)
  .scope('https://www.googleapis.com/auth/userinfo.profile https://www.google.com/m8/feeds/')
  .findOrCreateUser( function (sess, accessToken, extra, googleUser) {
	console.log('test google');
    googleUser.refreshToken = extra.refresh_token;
    googleUser.expiresIn = extra.expires_in;
    return usersByGoogleId[googleUser.id] || (usersByGoogleId[googleUser.id] = addUser('google', googleUser));
  })
  .redirectPath('/');

var app = express.createServer(
    express.bodyParser()
  , express.static(__dirname + "/public")
  , express.favicon()
  , express.cookieParser()
  , express.session({ secret: 'htuayreve'})
  , everyauth.middleware()
);


app.configure(function() {
  app.set('port', process.env.PORT || 3000)
  app.set('views', 'views')
  app.engine('html', require('ejs').renderFile);
  app.set("view options", {layout: false})
 // app.set('view engine', 'jade')
  app.use(express.favicon())
  app.use(express.logger('dev'))
  app.use(express.cookieParser('scrt'))
  app.use(express.session())
  app.use(everyauth.middleware())
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(express.static(__dirname))
  app.use(preEveryauthMiddlewareHack());
  app.use(everyauth.middleware());
  app.use(postEveryauthMiddlewareHack());
})



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
    }
};

function postEveryauthMiddlewareHack() {
  var userAlias = everyauth.expressHelperUserAlias || 'user';
  return function( req, res, next) {
    res.locals.everyauth.user = req.user;
    res.locals[userAlias] = req.user;
    next();
  };
};

app.get('/', function (req, res) {
	var supplies = new Array("name");
	res.render('index.ejs', { title: 'Login' , supplies: supplies});
});

app.get('/login/geoquestUser', function (req, res) {
	var supplies = new Array("name");
	res.render('index.ejs', { title: 'Login' , supplies: supplies});
});

app.get('/signup/geoquestUser', require('./routes/signup').signup);

app.post('/signup', require('./routes/signup').handleSignupPost);

everyauth.helpExpress(app);

app.listen(3000);

console.log('Go to http://local.host:3000');
console.log(__dirname);

module.exports = app;
=======
var express = require('express')
  , everyauth = require('everyauth')
  , conf = require('./conf')
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
  } else { // non-password-based
    user = usersById[++nextUserId] = {id: nextUserId};
    user[source] = sourceUser;
  }
  return user;
}

var usersByFbId = {};
var usersByGoogleId = {};
var usersByGoogleHybridId = {};

everyauth.everymodule
  .findUserById( function (id, callback) {
    callback(null, usersById[id]);
  });

everyauth
  .facebook
    .appId(conf.fb.appId)
    .appSecret(conf.fb.appSecret)
    .findOrCreateUser( function (session, accessToken, accessTokenExtra, fbUserMetadata) {
	  console.log('test fb');
      return usersByFbId[fbUserMetadata.id] ||
        (usersByFbId[fbUserMetadata.id] = addUser('facebook', fbUserMetadata));
    })
    .redirectPath('/');

everyauth.google
  .appId(conf.google.clientId)
  .appSecret(conf.google.clientSecret)
  .scope('https://www.googleapis.com/auth/userinfo.profile https://www.google.com/m8/feeds/')
  .findOrCreateUser( function (sess, accessToken, extra, googleUser) {
	console.log('test google');
    googleUser.refreshToken = extra.refresh_token;
    googleUser.expiresIn = extra.expires_in;
    return usersByGoogleId[googleUser.id] || (usersByGoogleId[googleUser.id] = addUser('google', googleUser));
  })
  .redirectPath('/');

var app = express.createServer(
    express.bodyParser()
  , express.static(__dirname + "/public")
  , express.favicon()
  , express.cookieParser()
  , express.session({ secret: 'htuayreve'})
  , everyauth.middleware()
);


app.configure(function() {
  app.set('port', process.env.PORT || 3000)
  app.set('views', 'views')
  app.engine('html', require('ejs').renderFile);
  app.set("view options", {layout: false})
 // app.set('view engine', 'jade')
  app.use(express.favicon())
  app.use(express.logger('dev'))
  app.use(express.cookieParser('scrt'))
  app.use(express.session())
  app.use(everyauth.middleware())
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(express.static(__dirname))
  app.use(preEveryauthMiddlewareHack());
  app.use(everyauth.middleware());
  app.use(postEveryauthMiddlewareHack());
})



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
    }
};

function postEveryauthMiddlewareHack() {
  var userAlias = everyauth.expressHelperUserAlias || 'user';
  return function( req, res, next) {
    res.locals.everyauth.user = req.user;
    res.locals[userAlias] = req.user;
    next();
  };
};

app.get('/', function (req, res) {
	var supplies = new Array("name");
	res.render('index.ejs', { title: 'Login' , supplies: supplies});
});

app.get('/login/geoquestUser', function (req, res) {
	var supplies = new Array("name");
	res.render('index.ejs', { title: 'Login' , supplies: supplies});
});

app.get('/signup/geoquestUser', require('./routes/signup').signup);

app.post('/signup', require('./routes/signup').handleSignupPost);

everyauth.helpExpress(app);

app.listen(3000);

console.log('Go to http://local.host:3000');
console.log(__dirname);

module.exports = app;
>>>>>>> 35171ab773ee5cd74e1cc81e710c8a520442f7f8
