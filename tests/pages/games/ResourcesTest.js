var assert = require('assert');

var Resources = require("../../../ServerComponents/pages/games/Resources");
var Request = require("../../../ServerComponents/util/test/Request");
var Response = require("../../../ServerComponents/util/test/Response");
var Resource = require("../../../ServerComponents/Resource");
var User = require("../../../ServerComponents/User");
var Game = require("../../../ServerComponents/Game");

describe('Resources page', function() {

	/**
	 * System under test.
	 * 
	 * @var {Resources}
	 */
	var resourcesController = null;
	
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
	 * The simulated game repository.
	 * 
	 * @var {Object}
	 */
	var gameRepository = null;
	
	/**
	 * The simulated resource repository.
	 * 
	 * @var {Object}
	 */
	var resourceRepository = null;
	
	beforeEach(function() {
		resourcesController = new Resources.class();
		gameRepository = {
			findGameById: function(id, callback) {
				var game = new Game.class();
				game.setId(id);
				game.addAuthor('user-id');
				callback(game);
			}
		};
		resourcesController.setGameRepository(gameRepository);
		
		resourceRepository = {
			insert: function(resource) {
			}
		};
		resourcesController.setResourceRepository(resourceRepository);
				
		var user = new User.class();
		user.setId('user-id');
		
		request = new Request.class();
		request.method = 'POST';
		request.session.user = user;
		request.files = {
			"resource" : {
				"path" : "C:/path/to/file",
				"name" : "file",
				"type" : "text",
				"filename" : "file",
				"hash" : ""
			}
			
		};
		request.params.gameId = "12345";
		
		response = new Response.class();
	});
	
	afterEach(function() {
		response = null;
		request = null;
		resourcesController = null;
		resourceRepository = null;
		gameRepository = null;
	});
	
	it('redirects to error page if game ID is missing', function() {
		request.params.gameId = undefined;
		resourcesController.handleRequest(request, response);
		assert.equal(response.redirectUrl, 'error/NotFound');
	});
	
	it('requests game with passed id from repository', function(done) {
		gameRepository.findGameById = function(id) {
			assert.equal('12345', id);
			done();
		};
		resourcesController.handleRequest(request, response);
	});
	
	it('redirects to error page if logged in user is not author of the requested game', function() {
		request.session.user.setId('another-id');
		resourcesController.handleRequest(request, response);
		assert.equal(response.redirectUrl, 'error/NotFound');
	});
	
	it('renders the upload form if page is requested via GET', function() {
		request.method = 'GET';
		resourcesController.handleRequest(request, response);
		assert.equal(response.template, 'games/resources.ejs');
	});
	
	it('passes game to template if page is requested via GET', function() {
		request.method = 'GET';
		resourcesController.handleRequest(request, response);
		assert.notEqual(typeof response.templateVars.game, 'undefined');
	});
	
	it('does not call GridFS subsystem if no file was uploaded', function() {
		request.files = {};
		resourceRepository.insert = function(resource) {
			assert.fail('Resource repository should not be called.');
		};
		resourcesController.handleRequest(request, response);
	});
	
	it('provides message if no file is uploaded', function() {
		request.files.resource = null;
		resourcesController.handleRequest(request, response);
		assert.equal(response.templateVars.msgUploadResource, 'Please provide a resource file.');
	});
	
	it('passes game to template ifno file is uploaded', function() {
		request.files.resource = null;
		resourcesController.handleRequest(request, response);
		assert.notEqual(typeof response.templateVars.game, 'undefined');
	});
	
	it('passes uploaded file to GridFS', function(done) {
		resourceRepository.insert = function(resource) {
			assert.ok(resource instanceof Resource.class);
			done();
		};
		resourcesController.handleRequest(request, response);
	});

// Don't render this msg anymore
//	it('provides message if resource was uploaded successfully', function() {
//		resourcesController.handleRequest(request, response);
//		assert.equal(response.templateVars.msgUploadResource, 'Resource was successfully added.');
//	});
	
	it('passes game to template if resource was uploaded successfully', function() {
		resourcesController.handleRequest(request, response);
		assert.notEqual(typeof response.templateVars.game, 'undefined');
	});
	
});