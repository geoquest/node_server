/**
 * This file exports configuration options 
 * that modify the server behavior.
 */
var serverConfiguration = {
    // The port the server listens on.
	'port': 3000,
	// Defines the template engine that is used.
	'view engine': 'ejs',
	// The directory that contains the view templates.
	'views': __dirname + '/../views',
	// Directory that contains public contents.
	'public': __dirname + '/../public'
};

module.exports = serverConfiguration;