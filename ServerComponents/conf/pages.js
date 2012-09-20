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
 * 
 * To ensure that a page can only be viewed by users or guests, the "restrictedTo"
 * property is used:
 * <code>
 * {
 *     '/login': {
 *         'module': 'Login',
 *         'restrictedTo': 'guest'
 *     }
 * }
 * </code>
 * In the example above the login page is only available for guests.
 * If "restrictedTo" is omitted then the page is available for both, 
 * logged in users and guests.
 */
var pages = {
	'/': {
		'module': 'Home'
	},
	'/games': {
		'module': 'games/YourGames',
		'restrictedTo': 'user'
	},
	'/games/resources': {
		'module': 'games/Resources',
		'restrictedTo': 'user'
	},
	'/games/findAll': {
		'module': 'games/Find'
	},
	'/games/download': {
		'module': 'games/Download'
	},
	'/games/downloadResources': {
		'module': 'games/DownloadResources'
	},
	'/games/resource-list': {
		'module': 'games/ResourceList'
	},
	'/games/listPublic': {
		'module': 'games/ShowAllPublicGames'
	},
	'/games/saveState': {
		'module': 'games/SaveState',
		'restrictedTo': 'user'
	},
	'/login/mobile': {
		'module': 'login/GeoQuestMobile',
		'restrictedTo': 'guest'
	},
	'/login': {
		'module': 'login/GeoQuest',
		'restrictedTo': 'guest'
	},
	'/login/facebook': {
	    'module': 'login/Facebook',
	    'restrictedTo': 'guest'
	},
	'/login/google': {
	    'module': 'login/Google',
	    'restrictedTo': 'guest'
	},
	'/signup': {
		'module': 'SignUp',
		'restrictedTo': 'guest'
	},
	'/logout': {
		'module': 'Logout',
		'restrictedTo': 'user'
	},
	//That's a workaround solution for the unused everyauth logout feature 
	'/error/notfound': {
		'module': 'error/NotFound'
	},
	// Register a catch-all route that handles requests that point
	// to not existing pages.
	'*': {
		'module': 'error/NotFound'
	},
	
};

module.exports = pages;
