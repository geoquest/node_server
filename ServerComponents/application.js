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
var expressLayouts = require('express-ejs-layouts');
var serverConf = require('./conf/serverConf');
var everyauth = require('./middleware/everyauth');
var userAdapter = require('./middleware/UserAdapter');
var templateVariables = require('./middleware/TemplateVariables');

var app = express();

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
	// Register everyauth middleware.
	// Everyauth defines several routes and callbacks that are used
	// for authentication against external services (for example
	// Facebook or Google+).
	app.use(everyauth.middleware());
	// Automatically converts JSON objects in the session back into
	// User instances (if needed).
	app.use(userAdapter.fromJsonAdapter());
	app.use(expressLayouts);
	// Exposes the currently logged in user as "user" parameter to 
	// the view templates.
	app.use(templateVariables.importVariables());
});

var dependencies = {
	'setDatabaseConnection': function() {
		var dbconf = require('./conf/dbconf');
		return require("mongojs").connect(dbconf.url, dbconf.collections);
	},
	'setUserRepository': function() {
		var UserRepository = require('./UserDataAccess');
		return new UserRepository.class(this.setDatabaseConnection());
	},
	'setGameRepository': function() {
		var GameRepository = require('./GameRepository');
		return new GameRepository.class(this.setDatabaseConnection());
	}
};
var DependencyInjector = require('./DependencyInjector');
var injector = new DependencyInjector.class(dependencies);
var PageDispatcher = require('./PageDispatcher');
var dispatcher = new PageDispatcher.class(__dirname + '/pages', injector);

var pages = require(__dirname + '/conf/pages');
for (var route in pages) {
	var pageInfo = pages[route];
	var handler = dispatcher.createHandlerFor(pageInfo);
	app.all(route, handler);
}

//start server
app.listen(app.get('port'));
