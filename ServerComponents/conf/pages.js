/**
 * This configurations maps routes to pages that handle the requests.
 * 
 * The route is used as property name. The value is an object that specifies
 * the page module that handles the incoming requests.
 * 
 * The page property defines the path to the module that handles the
 * requests, relative to the pages directory:
 * <code>
 * {
 *     '/': {
 *         'page': 'start/home'
 *     }
 * }
 * </code>
 */
var pages = {
	'/': {
		'page': 'Home'
	},
	'/signup': {
		'page': 'SignUp'
	},
	'/login': {
		'page': 'login/GeoQuest'
	}
};

exports = pages;