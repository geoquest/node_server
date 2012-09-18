var assert = require("assert");
var User = require("../../../ServerComponents/User");
var GeoQuestMobileLogin = require("../../../ServerComponents/pages/login/GeoQuestMobile");

describe('GeoQuestMobileLogin page', function() {
	
	/**
	 * System under test.
	 * 
	 * @var {GeoQuestMobileLogin.class}
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
			"method": "POST",
			"session":{}
		};
		request.body = {"username":"max.mustermann", "password":"secret"};
		response = {
			// The object remembers the last rendered template
			// for later checks.
			stringifyJSON: null,
			write: function(stringifiedJSON) {
				this.stringifyJSON = stringifiedJSON;
			},
			end : function(){
				
			}
		};
		userRepository = {
			byGeoQuestIdentifier: function(identifier, callback) {
				// Per default a miss is simulated: User is not in the database
				callback(null);
			}
		};
		page = new GeoQuestMobileLogin.class();
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
			assert.ok(page instanceof GeoQuestMobileLogin.class);
		});
	});
	
	describe('handleRequest', function() {		
		it('passes provided username as GeoQuest identifier to the server', function(done) {
			userRepository.byGeoQuestIdentifier = function(identifier, callback) {
				assert.equal(identifier, "max.mustermann");
				// Simulate miss.
				callback(null);
				done();
			};
			page.handleRequest(request, response);
		});
		it('rejects credentials if user is not in the database', function(done) {
			request.body.username = "fritz.futermann";
			userRepository.byGeoQuestIdentifier = function(identifier, callback) {
				assert.notDeepEqual(identifier, "max.mustermann");
				// Simulate miss.
				callback(null);
				done();
			};
			page.handleRequest(request, response);
			assert.ok(!("user" in request.session));
		});
		it('rejects credentials if password is not valid', function(done) {
			userRepository.byGeoQuestIdentifier = function(identifier, callback) {
				assert.equal(identifier, "max.mustermann");
				// Simulate that the user was found.
				var user = new User.class();
				user.setLoginType("GeoQuest");
				user.setIdentifier("max.mustermann");
				user.setPassword("another password");
				callback(user);
				done();
			};
			page.handleRequest(request, response);
			assert.ok(!("user" in request.session));
		});
		it('adds user to session if credentials are valid', function(done) {
			userRepository.byGeoQuestIdentifier = function(identifier, callback) {
				assert.equal(identifier, "max.mustermann");
				// Simulate that the user was found.
				var user = new User.class();
				user.setLoginType("GeoQuest");
				user.setIdentifier("max.mustermann");
				user.setPassword("secret");
				callback(user);
				done();
			};
			page.handleRequest(request, response);
			assert.ok("user" in request.session);
		});
	});
	
});