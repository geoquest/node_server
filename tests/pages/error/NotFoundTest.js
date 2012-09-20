var assert = require("assert");
var NotFound = require("../../../ServerComponents/pages/error/NotFound");

describe('NotFound page', function() {
	
	/**
	 * System under test.
	 * 
	 * @var {NotFound.class}
	 */
	var page = null;
	
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
			'session': {},
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
			render: function(template) {
				this.template = template;
			},
			statusCode: 200
		};
		page = new NotFound.class();
	});
	
	/**
	 * Removes instances that were created for testing after each test.
	 */
	afterEach(function() {
		page = null;
		response = null;
		request = null;
	});
	
	describe('constructor', function() {
		it('should create a page instance', function() {
			assert.ok(page instanceof NotFound.class);
		});
	});
	
	describe('handleRequest', function() {
		it('renders not-found template', function() {
			page.handleRequest(request, response);
			assert.equal('error/not-found.ejs', response.template);
			
		});
		it('sends HTTP code 404', function() {
			page.handleRequest(request, response);
			assert.strictEqual(404, response.statusCode);
		});
	});
	
});