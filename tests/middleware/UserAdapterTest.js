var assert = require("assert");

var adapter = require("../../ServerComponents/middleware/UserAdapter");

describe('UserAdapter', function() {

	/**
	 * System under test.
	 * 
	 * @var {function}
	 */
	var adapter = null;

	/**
	 * Is executed before each test runs and sets up the environment.
	 */
	beforeEach(function() {
		adapter = fromJsonAdapter();
	});

	/**
	 * Removes instances that were created for testing after each test.
	 */
	afterEach(function() {
		adapter = null;
	});

	describe('fromJsonAdapter', function() {
		it('returns function', function() {

		});
	});
	
	describe('middleware', function() {
		it('calls next callback', function() {

		});
		it('does nothing if user is undefined', function() {

		});
		it('does nothing if user is null', function() {

		});
		it('does nothing if user is stored as User object', function() {
			
		});
		it('converts to User object if JSON is received', function() {
			
		});
	});

});