var assert = require("assert");
var User = require("../../../ServerComponents/User");
var FacebookLogin = require("../../../ServerComponents/pages/login/Facebook");

describe('FacebookLogin page', function() {
	
	/**
	 * System under test.
	 * 
	 * @var {FacebookLogin.class}
	 */
	var page = null;
	
	/**
	 * A simulated User repository.
	 * 
	 * @var {Object}
	 */
	var userRepository = null;
	
	/**
	 * Simulated request object.
	 * 
	 * @var {Object}
	 */
	var request = null;
	
	/**
	 * Simulated response object.
	 * 
	 * @var {Object}
	 */
	var response = null;
	
	/**
	 * Is executed before each test runs and sets up the environment.
	 */
	beforeEach(function() {
		request = {
			'method': 'GET',
			'params': {},
			'session': {},
			// Simulate param() function.
			'param': function(name) {
				if (name in this.params) {
					return this.params[name];
				}
				return undefined;
			}
		};
		response = {
			// The object remembers the last rendered template
			// for later checks.
			template: null,
			render: function(template) {
				this.template = template;
			}
		};
		userRepository = {
			byFacebookIdentifier: function(identifier, callback) {
				// Per default a miss is simulated: User is not in the database
				callback(null);
			}, 
			insertUser: function(user) {
			}
		};
		page = new FacebookLogin.class();
		page.setUserRepository(userRepository);
	});
	
	/**
	 * Removes instances that were created for testing after each test.
	 */
	afterEach(function() {
		page = null;
		userRepository = null;
		response = null;
		request = null;
	});
});