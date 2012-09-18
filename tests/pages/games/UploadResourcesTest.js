var assert = require('assert');

var UploadResources = require("../../../ServerComponents/pages/games/UploadResources");
var Request = require("../../../ServerComponents/util/test/Request");
var Response = require("../../../ServerComponents/util/test/Response");
var Resource = require("../../../ServerComponents/Resource");
var User = require("../../../ServerComponents/User");
var Game = require("../../../ServerComponents/Game");

describe('UploadResources page', function() {

	/**
	 * System under test.
	 * 
	 * @var {UploadResources}
	 */
	var resourceUploader = null;
	
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
		resourceUploader = new UploadResources.class();
		gameRepository = {
			findGameById: function(id, callback) {
				var game = new Game.class();
				game.setId(id);
				game.addAuthor('user-id');
				callback(game);
			}
		};
		resourceUploader.setGameRepository(gameRepository);
		
		resourceRepository = {
			insert: function(resource) {
			}
		};
		resourceUploader.setResourceRepository(resourceRepository);
				
		var user = new User.class();
		user.setId('user-id');
		
		request = new Request.class();
		request.method = 'POST';
		request.session.user = user;
		request.files = {
			"game" : {
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
		resourceUploader = null;
		resourceRepository = null;
		gameRepository = null;
	});
	
	it('redirects to error page if game ID is missing', function() {
		request.params.gameId = undefined;
		resourceUploader.handleRequest(request, response);
		assert.equal(response.redirectUrl, 'error/NotFound');
	});
	
	it('requests game with passed id from repository', function(done) {
		gameRepository.findGameById = function(id) {
			assert.equal('12345', id);
			done();
		};
		resourceUploader.handleRequest(request, response);
	});
	
	it('redirects to error page if logged in user is not author of the requested game', function() {
		request.session.user.setId('another-id');
		resourceUploader.handleRequest(request, response);
		assert.equal(response.redirectUrl, 'error/NotFound');
	});
	
	it('renders the upload form if page is requested via GET', function() {
		request.method = 'GET';
		resourceUploader.handleRequest(request, response);
		assert.equal(response.template, 'uploadResources.ejs');
	});
	
	it('does not call GridFS subsystem if no file was uploaded', function() {
		request.files = {};
		resourceRepository.insert = function(resource) {
			assert.fail('Resource repository should not be called.');
		};
		resourceUploader.handleRequest(request, response);
	});
	
	it('provides message if no file is uploaded', function() {
		request.files.game = null;
		resourceUploader.handleRequest(request, response);
		assert.equal(response.templateVars.msg, 'Please provide a resource file.');
	});
	
	it('passes uploaded file to GridFS', function(done) {
		resourceRepository.insert = function(resource) {
			assert.ok(resource instanceof Resource.class);
			done();
		};
		resourceUploader.handleRequest(request, response);
	});
	
	it('provides message if resource was uploaded successfully', function() {
		resourceUploader.handleRequest(request, response);
		assert.equal(response.templateVars.msg, 'Resource was successfully added.');
	});
	
});