var assert = require("assert");

var pageModulesPath = __dirname + '/../ServerComponents/util/test';

var Page = require("../ServerComponents/util/test/Page");;
var Request = require("../ServerComponents/util/test/Request");
var Response = require("../ServerComponents/util/test/Response");
var User = require("../ServerComponents/User");
var PageDispatcher = require("../ServerComponents/PageDispatcher");


describe('PageDispatcher', function() {

	/**
	 * System under test.
	 * 
	 * @var {}
	 */
	var dispatcher = null;
	
	/**
	 * The simulated dependency injector.
	 * 
	 * @var {Object}
	 */
	var injector = null;
	
	/**
	 * Example page configuration.
	 * 
	 * @var {Object}
	 */
	var config = null;
	
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
	 * Creates a new user object for testing.
	 * 
	 * @return {User.class}
	 */
	var createUser = function() {
		var user = new User.class();
		user.setLoginType('GeoQuest');
		user.setIdentifier('max.mustermann');
		return user;
	};

	/**
	 * Is executed before each test runs and sets up the environment.
	 */
	beforeEach(function() {
		injector = {
			inject: function(object) {
				// Inject nothing, simply simulate injector API.
				return object;
			}
		};
		// Default page configuration.
		config = {
			'module': 'Page'
		};
		request = new Request.class();
		response = new Response.class();
		dispatcher = new PageDispatcher.class(pageModulesPath, injector);
	});

	/**
	 * Removes instances that were created for testing after each test.
	 */
	afterEach(function() {
		dispatcher = null;
		response = null;
		request = null;
		config = null;
		injector = null;
	});

	describe('constructor', function() {
		it('throws exception if page module path is omitted', function() {
			assert.throws(function() {
				new PageDispatcher.class(undefined, injector);
			});
		});
		it('throws exception if module path does not exist', function() {
			assert.throws(function() {
				new PageDispatcher.class(__dirname + '/missing/directory', injector);
			});
		});
		it('throws exception if injector is omitted', function() {
			assert.throws(function() {
				new PageDispatcher.class(pageModulesPath);
			});
		});
	});
	
	describe('createHandlerFor', function() {
		it('returns function', function() {
			var handler = dispatcher.createHandlerFor(config);
			assert.equal(typeof handler, 'function');
		});
		it('loads required module', function() {
			var handler = dispatcher.createHandlerFor(config);
			var page = handler(request, response, function() {});
			assert.ok(page instanceof Page.class);
		});
		it('passes module to dependency injector', function(done) {
			injector.inject = function(object) {
				assert.ok(object instanceof Page.class);
				done();
				return object;
			};
			var handler = dispatcher.createHandlerFor(config);
			handler(request, response, function() {});
		});
		it('passes request and response to handleRequest()', function() {
			var handler = dispatcher.createHandlerFor(config);
			var page = handler(request, response, function() {});
			assert.ok(page instanceof Page.class);
			assert.strictEqual(page.request, request);
			assert.strictEqual(page.response, response);
		});
		it('calls handleRequest() if no restrictions are configured', function() {
			var handler = dispatcher.createHandlerFor(config);
			var page = handler(request, response, function() {});
			assert.ok(page instanceof Page.class);
			assert.strictEqual(page.called, true);
		});
		it('calls handleRequest() if page is restricted to user and user is logged in', function() {
			config.restrictedTo = 'user';
			request.session.user = createUser();
			var handler = dispatcher.createHandlerFor(config);
			var page = handler(request, response, function() {});
			assert.ok(page instanceof Page.class);
			assert.strictEqual(page.called, true);
		});
		it('calls handleRequest() if page is restricted to guest and no user is logged in', function() {
			config.restrictedTo = 'guest';
			request.session.user = undefined;
			var handler = dispatcher.createHandlerFor(config);
			var page = handler(request, response, function() {});
			assert.ok(page instanceof Page.class);
			assert.strictEqual(page.called, true);
		});
		it('proceeds without calling handleRequest() if page is restricted to user and no user is logged in', function() {
			config.restrictedTo = 'user';
			request.session.user = undefined;
			var handler = dispatcher.createHandlerFor(config);
			var page = handler(request, response, function() {});
			assert.ok(page instanceof Page.class);
			assert.strictEqual(page.called, false);
		});
		it('proceeds without calling handleRequest() if page is restricted to guest and user is logged in', function() {
			config.restrictedTo = 'guest';
			request.session.user = createUser();
			var handler = dispatcher.createHandlerFor(config);
			var page = handler(request, response, function() {});
			assert.ok(page instanceof Page.class);
			assert.strictEqual(page.called, false);
		});
	});

});