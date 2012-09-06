/**
 * This configurations maps routes to pages that handle the requests.
 * 
 * The route is used as property name. The value is an object that specifies
 * the page module that handles the incoming requests.
 * 
 * The "module" property defines the path to the module that handles the
 * requests, relative to the pages directory:
 * <code>
 * {
 *     '/': {
 *         'module': 'start/Home'
 *     }
 * }
 * </code>
 */
var pages = {
	'/': {
		'module': 'Home'
	},
	'/signup': {
		'module': 'SignUp'
	},
	'/login': {
		'module': 'login/GeoQuest'
	}
};

module.exports = pages;