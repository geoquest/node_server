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
			
		});
		it('initializes request attribute with null', function() {
			
		});
		it('initializes response attribute with null', function() {
			
		});
	});
	
	describe('handleRequest', function() {
		it('store provided request', function() {
			
		});
		it('store provided response', function() {
			
		});
	});

});