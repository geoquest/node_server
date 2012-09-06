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

app.get('/', require('./routes/login').loginWithFbGp);
app.get('/login/geoquestUser', require('./routes/login').loginWithGQDB);
app.get('/signup/geoquestUser', require('./routes/signup').signup);
app.post('/signup', require('./routes/signup').handleSignupPost);
app.post('/login', require('./routes/login').handleLoginPost);

app.listen(3000);

module.exports = app;
