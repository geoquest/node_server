var User = require('../User');

/**
 * Checks the session for user data.
 * 
 * If user data is present then the middleware checks if it
 * is a User object (as desired) or a JSON representation
 * of a User. JSON objects are automatically converted 
 * back into User instances.
 */
var userFromJson = function(request, response, next) {
	if (request.session.user !== null && (typeof request.session.user) === 'object') {
		if (!(request.session.user instanceof User.class)) {
			request.session.user = User.fromJSON(request.session.user);
	    }
	}
	next();
};

module.exports.fromJsonAdapter = function() {
	return userFromJson;
};