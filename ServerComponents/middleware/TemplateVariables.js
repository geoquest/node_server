
/**
 * Passes variables (encapsulated in functions) to the view templates.
 * 
 * Encapsulation in function guarantees that the execution of the 
 * code that is responsible for providing the variable value
 * is delayed.
 * In some cases this is important as for example the session might
 * change during the request lifecycle, but the middleware is
 * just executed on start.
 * To get the latest values in the view, the code that accesses
 * the session should be executed as late as possible.
 * 
 * @param {Object} request
 * @param {Object} response
 * @param {function} next
 */
var importVariables = function(request, response, next) {
	request.app.locals.user = function() {
		return _getUser(request.session);
	};
	next();
};

/**
 * Extracts the user data from the session.
 * 
 * Returns null if the user is not logged in.
 * 
 * @param {Object} session
 * @returns {Object}|null
 */
function _getUser(session) {
	if (session && session.user) {
		return session.user;
	}
	return null;
};

/**
 * Returns the function that represents the middleware.
 * 
 * @return {function}
 */
module.exports.importVariables = function() {
	return importVariables;
};