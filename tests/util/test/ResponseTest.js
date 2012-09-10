var assert = require("assert");

var Response = require("../../../ServerComponents/util/test/Response.js");

describe('Response', function() {

	/**
	 * System under test.
	 * 
	 * @var {Response.class}
	 */
	var response = null;

	/**
	 * Is executed before each test runs and sets up the environment.
	 */
	beforeEach(function() {
		response = new Response.class();
	});

	/**
	 * Removes instances that were created for testing after each test.
	 */
	afterEach(function() {
		response = null;
	});

	describe('constructor', function() {
		it('creates response instance', function() {
			assert.ok(response instanceof Response.class);
		});
	});
	
	describe('template attribute', function() {
		it('is initially null', function() {
			
		});
	});
	
	describe('templateVars attribute', function() {
		it('is initially null', function() {
			
		});
	});
	
	describe('redirectUrl attribute', function() {
		it('is initially null', function() {
			
		});
	});
	
	describe('redirectStatus attribute', function() {
		it('is initially null', function() {
			
		});
	});
	
	describe('render', function() {
		it('stores template name in template attribute', function() {
			
		});
		it('stores template variables in templateVars attribute', function() {
			
		});
		it('stores empty object in templateVars attribute if variables are omitted', function() {
			
		});
		
	});
	
	describe('redirect function', function() {
		it('stores status code in redirectStatus attribute', function() {
			
		});
		it('stores url in redirectUrl attribute', function() {
			
		});
		it('stores correct url if status is omitted', function() {
			
		});
		it('stores status code 302 if status is omitted', function() {
			
		});
	});

});