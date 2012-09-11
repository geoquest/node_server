
/**
 * Creates a new dispatcher.
 * 
 * @param {String} pageModulesPath Path to page modules.
 * @param {Object} injector Dependency injector that is used.
 */
PageDispatcher = function(pageModulesPath, injector) {
	
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
PageDispatcher.prototype.createHandlerFor(pageConfig) {
	
};

/*return function(request, response) {
	var module = require(__dirname + '/pages/' + pageInfo.module);
	var page = new module.class();
	injector.inject(page);
	page.handleRequest(request, response);
};*/

module.exports.class = PageDispatcher;