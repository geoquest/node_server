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
		'module': 'SignUp',
		'restrictedTo': 'guest'
	},
	'/login': {
		'module': 'login/GeoQuest',
		'restrictedTo': 'guest'
	},
	'/games/upload': {
		'module': 'games/Upload',
		'restrictedTo': 'user'
	},
	'/games/findAll': {
		'module': 'games/Find'
	},
	'/games/uploaded': {
		'module': 'games/AuthorRelated',
		'restrictedTo': 'user'
	},
	'/signout': {
		'module': 'Logout',
		'restrictedTo': 'user'
	},
	'/login/facebook': {
	    'module': 'login/Facebook',
	    'restrictedTo': 'guest'
	},
	'/login/google': {
	    'module': 'login/Google',
	    'restrictedTo': 'guest'
	},
	// Register a catch-all route that handles requests that point
	// to not existing pages.
	'*': {
		'module': 'error/NotFound'
	}
};

module.exports = pages;
