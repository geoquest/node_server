var assert = require("assert");

var Page = require("../../../ServerComponents/util/test/Page");

describe('TestPage', function() {

	/**
	 * System under test.
	 * 
	 * @var {}
	 */
	var page = null;

	/**
	 * Is executed before each test runs and sets up the environment.
	 */
	beforeEach(function() {
		page = new Page.class();
	});

	/**
	 * Removes instances that were created for testing after each test.
	 */
	afterEach(function() {
		page = null;
	});
	
	describe('constructor', function() {
		it('creates page instance', function() {
			assert.ok(page instanceof Page.class);
		});
		it('initializes request attribute with null', function() {
			assert.strictEqual(page.request, null);
		});
		it('initializes response attribute with null', function() {
			assert.strictEqual(page.response, null);
		});
		it('initializes called attribute with false', function() {
			assert.strictEqual(page.called, false);
		});
	});
	
	describe('handleRequest', function() {
		it('stores provided request', function() {
			var request = {};
			page.handleRequest(request, {});
			assert.strictEqual(page.request, request);
		});
		it('stores provided response', function() {
			var response = {};
			page.handleRequest({}, response);
			assert.strictEqual(page.response, response);
		});
		it('sets called to true', function() {
			page.handleRequest({}, {});
			assert.strictEqual(page.called, true);
		});
	});

});