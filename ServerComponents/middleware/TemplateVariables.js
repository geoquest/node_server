
/**
 * Passes variables to the view templates.
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
	if (session.user) {
		return session.user;
	}
	return null;
};

module.exports.importVariables = function() {
	return importVariables;
};