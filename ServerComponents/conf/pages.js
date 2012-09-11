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
	},
	'/games/upload': {
		'module': 'games/Upload'
	},
	'/games/findAll': {
		'module': 'games/Find'
	},
	'/games/uploaded': {
		'module': 'games/AuthorRelated'
	},
	'/signout': {
		'module': 'Logout'
	},
	'/login/facebook': {
	    'module': 'login/Facebook'
	},
	'/login/google': {
	    'module': 'login/Google'
	},
	// Register a catch-all route that handles requests that point
	// to not existing pages.
	'*': {
		'module': 'error/NotFound'
	}
};

module.exports = pages;
