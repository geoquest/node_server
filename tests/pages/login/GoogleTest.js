var assert = require("assert");
var User = require("../../../ServerComponents/User");
var GoogleLogin = require("../../../ServerComponents/pages/login/Google");

describe('GoogleLogin page', function() {
	
	/**
	 * System under test.
	 * 
	 * @var {GoogleLogin.class}
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
	 * Returns an object with (minimal) user data as it is returned by Google.
	 * 
	 * @return {Object}
	 */
	var createGoogleUserData = function() {
		return {
			'name': 'google.id',
			'given_name': 'Max',
			'family_name': 'Mustermann'
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
				'googleUser': createGoogleUserData()
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
				byGoogleIdentifier: function(identifier, callback) {
				// Per default a miss is simulated: User is not in the database
				callback(null);
			}, 
			insertUser: function(user) {
			}
		};
		page = new GoogleLogin.class();
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
			assert.ok(page instanceof GoogleLogin.class);
		});
	});
	
	describe('handleRequest', function() {
		it('removes Google user data from session', function() {
			request.session.facebookUser = createGoogleUserData();
			page.handleRequest(request, response);
			assert.ok(request.session.googleUser === undefined);
		});
		it('inserts user if it does not exist yet', function(done) {
			userRepository.insertUser = function() {
				done();
			};
			page.handleRequest(request, response);
		});
		it('inserts user with LoginType Google', function(done) {
			userRepository.insertUser = function(user) {
				assert.equal(user.getLoginType(), 'Google');
				done();
			};
			page.handleRequest(request, response);
		});
		it('does not insert user if it already exists', function() {
			userRepository.byGoogleIdentifier = function(identifier, callback) {
				// Simulate user in database.
				var user = new User.class();
				user.setLoginType('Google');
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
		it('redirects to Google login if page if url was entered manually', function() {
			// Remove facebookUser data from session.
			delete request.session.googleUser;
			page.handleRequest(request, response);
			assert.equal(response.redirectUrl, '/auth/google');
		});
	});
	
});