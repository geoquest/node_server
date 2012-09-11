
var fs = require('fs');

/**
 * Creates a new dispatcher.
 * 
 * @param {String} pageModulesPath Path to page modules.
 * @param {Object} injector Dependency injector that is used.
 * @throws {Error} If the path does not exist or the injector is omitted. 
 */
PageDispatcher = function(pageModulesPath, injector) {
	if (!fs.existsSync(pageModulesPath)) { 
		throw new Error('Directory "' + pageModulesPath + '" does not exist.');
	}
	if ((typeof injector) !== 'object') {
		throw new Error('A dependency injector is required.');
	}
	this.pageModulesPath = pageModulesPath;
	this.injector = injector;
};

/**
 * Creates a handler function that dispatches requests to the
 * page module that is specified in the given configuration.
 * 
 * The returned function looks as follows:
 * <code>
 * function(request, response, next) {
 * }
 * </code>
 * For testing reasons it returns the page module that
 * was created for the request.
 * 
 * @param {Object} pageConfig
 * @return {function}
 */
PageDispatcher.prototype.createHandlerFor = function(pageConfig) {
	var self = this;
	return function(request, response, next) {
		var module = require(self.pageModulesPath + '/' + pageConfig.module);
		var page = new module.class();
		if (!self._isAllowed(self._getRole(request), pageConfig)) {
			// The current user is not allowed to access the page.
			next();
			return page;
		}
		self.injector.inject(page);
		page.handleRequest(request, response);
		return page;
	};
};

/**
 * Checks if the given role is allowed to access the specified page.
 * 
 * @param {String} role
 * @param {Object} pageConfig
 * @return {boolean}
 */
PageDispatcher.prototype._isAllowed = function(role, pageConfig) {
	if (pageConfig.restrictedTo === undefined) {
		// There are no restrictions defined.
		return true;
	}
	return pageConfig.restrictedTo === role;
};

/**
 * Uses the request to determine the role of the visitor.
 * 
 * @param {Object} request
 * @return {String}
 */
PageDispatcher.prototype._getRole = function(request) {
	if (request.session.user) {
		return 'user';
	}
	return 'guest';
};

module.exports.class = PageDispatcher;