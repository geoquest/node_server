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
	 * Returns an object with (minimal) user data as it is returned by Facebook.
	 * 
	 * @return {Object}
	 */
	var createFacebookUserData = function() {
		return {
			'username': 'facebook.id',
			'first_name': 'Max',
			'last_name': 'Mustermann'
		};
	};
	
	/**
	 * Is executed before each test runs and sets up the environment.
	 */
	beforeEach(function() {
		request = {
			'method': 'GET',
			'params': {},
			'session': {
				'facebookUser': createFacebookUserData()
			},
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
			redirectUrl: null,
			render: function(template) {
				this.template = template;
			},
			redirect: function(status, url) {
				this.redirectUrl = url;
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
	
	describe('constructor', function() {
		it('should create a page instance', function() {
			assert.ok(page instanceof FacebookLogin.class);
		});
	});
	
	describe('handleRequest', function() {
		it('removes Facebook user data from session', function() {
			request.session.facebookUser = createFacebookUserData();
			page.handleRequest(request, response);
			assert.ok(request.session.facebookUser === undefined);
		});
		it('inserts user if it does not exist yet', function(done) {
			userRepository.insertUser = function() {
				done();
			};
			page.handleRequest(request, response);
		});
		it('inserts user with LoginType Facebook', function(done) {
			userRepository.insertUser = function(user) {
				assert.equal(user.getLoginType(), 'Facebook');
				done();
			};
			page.handleRequest(request, response);
		});
		it('does not insert user if it already exists', function() {
			userRepository.byFacebookIdentifier = function(identifier, callback) {
				// Simulate user in database.
				var user = new User.class();
				user.setLoginType('Facebook');
				user.setIdentifier('unique');
				user.setFirstname('Max');
				user.setLastname('Mustermann');
				callback(user);
			};
			userRepository.insertUser = function() {
				assert.fail('User should not be stored if it already exists.');
			};
			page.handleRequest(request, response);
		});
		it('adds user to session on successful login', function() {
			page.handleRequest(request, response);
			assert.ok(request.session.user instanceof User.class);
		});
		it('renders (any) template on successful login', function() {
			page.handleRequest(request, response);
			assert.notEqual(response.template, null);
		});
		it('redirects to Facebook login if page if url was entered manually', function() {
			// Remove facebookUser data from session.
			delete request.session.facebookUser;
			page.handleRequest(request, response);
			assert.equal(response.redirectUrl, '/auth/facebook');
		});
	});
	
});