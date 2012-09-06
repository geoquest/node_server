var assert = require("assert");
var User = require("../../../ServerComponents/User");
var GeoQuestLogin = require("../../../ServerComponents/pages/login/GeoQuest");

describe('GeoQuestLogin page', function() {
	
	/**
	 * System under test.
	 * 
	 * @var {GeoQuestLogin.class}
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
			'session': {}
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
			byGeoQuestIdentifier: function(identifier, callback) {
				// Per default a miss is simulated: User is not in the database
				callback(null);
			}
		};
		page = new GeoQuestLogin.class();
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
			assert.ok(page instanceof GeoQuestLogin.class);
		});
	});
	
	describe('handleRequest', function() {
		it('renders login form if GET request is handled', function() {
			page.handleRequest(request, response);
			assert.equal('login.ejs', response.template);
			
		});
		it('does not search for user if GET request is handled', function() {
			userRepository.byGeoQuestIdentifier = function() {
				assert.fail('User repository should not be used.');
			};
			page.handleRequest(request, response);
		});
		it('passes provided username as GeoQuest identifier', function(done) {
			request.method = 'POST';
			request.params.username = 'max.mustermann';
			request.params.password = 'secret';
			
			userRepository.byGeoQuestIdentifier = function(identifier, callback) {
				assert.equal(identifier, 'max.mustermann');
				// Simulate miss.
				callback(null);
				done();
			};
			page.handleRequest(request, response);
		});
		it('rejects credentials if user is not in the database', function(done) {
			request.method = 'POST';
			request.params.username = 'max.mustermann';
			request.params.password = 'secret';
			
			userRepository.byGeoQuestIdentifier = function(identifier, callback) {
				assert.equal(identifier, 'max.mustermann');
				// Simulate miss.
				callback(null);
				done();
			};
			page.handleRequest(request, response);
			assert.ok(!('user' in request.session));
		});
		it('rejects credentials if password is not valid', function() {
			request.method = 'POST';
			request.params.username = 'max.mustermann';
			request.params.password = 'secret';
			
			userRepository.byGeoQuestIdentifier = function(identifier, callback) {
				assert.equal(identifier, 'max.mustermann');
				// Simulate that the user was found.
				var user = new User.class();
				user.setLoginType('GeoQuest');
				user.setIdentifier('max.mustermann');
				user.setPassword('another password');
				callback(user);
				done();
			};
			page.handleRequest(request, response);
			assert.ok(!('user' in request.session));
		});
		it('adds user to session if credentials are valid', function() {
			request.method = 'POST';
			request.params.username = 'max.mustermann';
			request.params.password = 'secret';
			
			userRepository.byGeoQuestIdentifier = function(identifier, callback) {
				assert.equal(identifier, 'max.mustermann');
				// Simulate that the user was found.
				var user = new User.class();
				user.setLoginType('GeoQuest');
				user.setIdentifier('max.mustermann');
				user.setPassword('secret');
				callback(user);
				done();
			};
			page.handleRequest(request, response);
			assert.ok('user' in request.session);
		});
	});
	
});