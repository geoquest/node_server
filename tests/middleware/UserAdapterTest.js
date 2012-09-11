var assert = require("assert");

var Request = require("../../ServerComponents/util/test/Request");
var Response = require("../../ServerComponents/util/test/Response");
var User = require("../../ServerComponents/User");
var adapter = require("../../ServerComponents/middleware/UserAdapter");

describe('UserAdapter', function() {

	/**
	 * System under test.
	 * 
	 * @var {function}
	 */
	var middleware = null;
	
	/**
	 * A simulated request object.
	 * 
	 * @var {Object}
	 */
	var request = null;
	
	/**
	 * A simulated response object.
	 * 
	 * @var {Object}
	 */
	var response = null;

	/**
	 * Is executed before each test runs and sets up the environment.
	 */
	beforeEach(function() {
		request = new Request.class();
		response = new Response.class();
		middleware = adapter.fromJsonAdapter();
	});

	/**
	 * Removes instances that were created for testing after each test.
	 */
	afterEach(function() {
		middleware = null;
		response = null;
		request = null;
	});

	describe('fromJsonAdapter', function() {
		it('returns function', function() {
			assert.equal(typeof middleware, 'function');
		});
	});
	
	describe('middleware', function() {
		it('calls next callback', function(done) {
			var next = function() {
				done();
			};
			middleware(request, response, next);
		});
		it('does nothing if user is undefined', function() {
			request.session.user = undefined;
			assert.doesNotThrow(function() {
				middleware(request, response, function() {});
			});
		});
		it('does nothing if user is null', function() {
			request.session.user = null;
			assert.doesNotThrow(function() {
				middleware(request, response, function() {});
			});
		});
		it('does nothing if user is stored as User object', function() {
			var user = new User.class();
			user.setLoginType('Google');
			user.setIdentifier('google-id');
			request.session.user = user;
			middleware(request, response, function() {});
			assert.strictEqual(request.session.user, user);
		});
		it('converts to User object if JSON is received', function() {
			var user = new User.class();
			user.setLoginType('Google');
			user.setIdentifier('google-id');
			var json = user.toJSON();
			request.session.user = json;
			middleware(request, response, function() {});
			assert.ok(request.session.user instanceof User.class);
		});
	});

});