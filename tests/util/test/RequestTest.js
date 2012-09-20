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
	
	describe('body', function() {
		it('is initially null', function() {
			assert.strictEqual(request.body, null);
		});
	});
	
	describe('validation middleware', function() {
		it('provides an assert function', function() {
			assert.equal(typeof request.assert, 'function');
		});
		it('provides an validationErrors function', function() {
			assert.equal(typeof request.validationErrors, 'function');
		});
		describe('assert()', function() {
			it('adds error if param does not fulfill validation rules', function() {
				request.params.email = 'invalid email';
				request.assert('email', 'error message').isEmail();
				assert.ok(request.validationErrors().length > 0);
			});
			it('does not add error if param fulfills validation rules', function() {
				request.params.email = 'info@geoquest.com';
				request.assert('email', 'error message').isEmail();
				assert.equal(request.validationErrors(), false);
			});
			
		});
		describe('validationErrors()', function() {
			it('evaluates to true if there is an error', function() {
				request.params.email = 'invalid email';
				request.assert('email', 'error message').isEmail();
				assert.ok(request.validationErrors());
			});
		});
	});
	
});