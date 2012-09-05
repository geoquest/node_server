/**
 * This file is used to start the GeoQuest Server application
 * 
 * Start the server by using this command
 * <code>
 * node application.js
 * </code>
 */

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
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));

});

app.get('/', require('./routes/login').loginWithFbGp);
app.get('/login/geoquestUser', require('./routes/login').loginWithGQDB);
app.get('/signup/geoquestUser', require('./routes/signup').signup);
app.post('/signup', require('./routes/signup').handleSignupPost);
app.post('/login', require('./routes/login').handleLoginPost);

app.listen(3000);

module.exports = app;
