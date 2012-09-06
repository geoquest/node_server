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
var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  // Set the path to the view templates.
  app.set('views', __dirname + '/views');
  // Use the EJS engine for template rendering.
  app.engine('html', require('ejs').renderFile);
  app.set("view options", {layout: false});
  // Provides access to cookies as part of the request object.
  app.use(express.cookieParser());
  // Provides some basic session handling in memory.
  app.use(express.session({'secret': crypto.randomBytes(64)}));
  // Parses the body, supports form handling.
  // http://www.senchalabs.org/connect/bodyParser.html
  app.use(express.bodyParser());
  // Exposes the contents in the given directory to the public.
  app.use(express.static(__dirname + '/public'));
});

var dependencies = {
	'setDatabaseConnection': function() {
		var dbconf = require('./conf/dbconf');
		return require("mongojs").connect(dbconf.url, dbconf.collections);
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

app.listen(3000);

module.exports = app;
