var assert = require("assert");

var Request = require("../../../ServerComponents/util/test/Request.js");

describe('Request', function() {
	
	/**
	 * System under test.
	 * 
	 * @var {Request.class}
	 */
	var request = null;
	
	/**
	 * Is executed before each test runs and sets up the environment.
	 */
	beforeEach(function() {
		request = new Request.class();
	});
	
	/**
	 * Removes instances that were created for testing after each test.
	 */
	afterEach(function() {
		request = null;
	});
	
	describe('constructor', function() {
		it('creates request instance', function() {
			assert.ok(request instanceof Request.class);
		});
	});
	
	describe('method', function() {
		it('is GET per default', function() {
			assert.equal(request.method, 'GET');
		});
	});
	
	describe('params', function() {
		it('is object', function() {
			assert.equal(typeof request.params, 'object');
		});
		it('is initially empty', function() {
			assert.equal(Object.keys(request.params).length, 0);
		});
	});
	
	describe('session', function() {
		it('is object', function() {
			assert.equal(typeof request.session, 'object');
		});
		it('is initially empty', function() {
			assert.equal(Object.keys(request.session).length, 0);
		});
	});
	
	describe('param()', function() {
		it('returns undefined if parameter is not available', function() {
			request.params.email = 'test@geoquest.com';
			assert.equal(request.param('name'), undefined);
		});
		it('returns requested parameter', function() {
			request.params.email = 'test@geoquest.com';
			assert.equal(request.param('email'), 'test@geoquest.com');
		});
	});
	
});