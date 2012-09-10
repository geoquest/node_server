/**
 * This file is used to start the GeoQuest Server application
 * 
 * Start the server by using this command
 * <code>
 * node application.js
 * </code>
 */
var crypto = require('crypto');
var express = require("express");
var serverConf = require('./conf/serverConf');
//login dependencies
var GeoQuest = require('./pages/login/GeoQuest');
var everyauth = require('everyauth');
var extAuthConf = require('./conf/extAuthConf');


var app = express();

//configure everyauth
everyauth.everymodule.findUserById( function(id, callback) {
	// Invoke callback to ensures that the routing proceeds.
	// Do not provide user information yet, this is handled 
	// by the login pages.
    callback(null, null);
});

everyauth
	.facebook
	.appId(extAuthConf.fb.appId)
	.appSecret(extAuthConf.fb.appSecret)
	.findOrCreateUser( function (session, accessToken, accessTokenExtra, fbUserMetadata) {
		// Pass Facebook user data to the session, so that it
		// can be processed by the login page module.
	    session.facebookUser = fbUserMetadata;
	    return fbUserMetadata;
	}).redirectPath('/login/facebook');

//everyauth.google
//	.appId(extAuthConf.google.clientId)
//	.appSecret(extAuthConf.google.clientSecret)
//	.scope('https://www.googleapis.com/auth/userinfo.profile https://www.google.com/m8/feeds/')
//	.findOrCreateUser( function (sess, accessToken, extra, googleUser) {
//		//implement login logic
//	})
//	.redirectPath('/login/google');

app.configure(function() {
	app.set('port', serverConf.port);
	// Set the path to the view templates.
	app.set('views', serverConf.views);
	// Use the EJS engine for template rendering.
	app.set('view engine', serverConf.viewEngine);
	// Provides access to cookies as part of the request object.
	app.use(express.cookieParser());
	// Provides some basic session handling in memory.
	app.use(express.session({'secret': crypto.randomBytes(64)}));
	// Parses the body, supports form handling.
	// http://www.senchalabs.org/connect/bodyParser.html
	app.use(express.bodyParser());
	// Exposes the contents in the given directory to the public.
	app.use(express.static(serverConf.public));
	// Provides everyauth functionalities
	app.use(everyauth.middleware());
});

var dependencies = {
	'setDatabaseConnection': function() {
		var dbconf = require('./conf/dbconf');
		return require("mongojs").connect(dbconf.url, dbconf.collections);
	},
	'setUserRepository': function() {
		var UserRepository = require('./UserDataAccess');
		return new UserRepository.class(this.setDatabaseConnection());
	}
};
var DependencyInjector = require('./DependencyInjector');
var injector = new DependencyInjector.class(dependencies);


var pages = require(__dirname + '/conf/pages');
for (var route in pages) {
	var pageInfo = pages[route];
	// Use a closure to create the handler function.
	// The closure guarantees, that pageInfo contains 
	// the correct value when the handler function is 
	// called.
	// Without the closure pageInfo would always contain
	// the value of the last iteration.
	// See http://stackoverflow.com/questions/750486/javascript-closure-inside-loops-simple-practical-example
	// for a simple example of the problem and a simple solution.
	var handler = function(pageInfo) {
		return function(request, response) {
			var module = require(__dirname + '/pages/' + pageInfo.module);
			var page = new module.class();
			injector.inject(page);
			page.handleRequest(request, response);
		};
	}(pageInfo);
	app.all(route, handler);
}

//start server
app.listen(app.get('port'));
