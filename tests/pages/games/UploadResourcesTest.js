var assert = require('assert');
var fs = require('fs');
var UploadResources = require("../../../ServerComponents/pages/games/UploadResources.js");
var Request = require("../../../ServerComponents/util/test/Request.js");
var Response = require("../../../ServerComponents/util/test/Response");

var User = require("../../../ServerComponents/User");
var GameRepository = require("../../../ServerComponents/GameRepository.js");

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
	
	beforeEach(function() {
		resourceUploader = new UploadResources.class();
		resourceUploader.setGameRepository({
			findGameById: function(id, callback) {
				callback(new Game.class());
			}
		});
				
		request = new Request.class();
		request.method = 'POST';
		request.session.user = new User.class();
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
		
		response = new Reponse.class();
	});
	
	afterEach(function() {
		response = null;
		request = null;
		resourceUploader = null;
	});
	
	it('redirects to error page if game ID is missing', function() {
		
	});
	
	it('requests game with passed id from repository', function() {
		
	});
	
	it('redirects to error page if logged in user is not author of the requested game', function() {
		
	});
	
	it('renders the upload form if page is requested via GET', function() {
		
	});
	
	it('does not call GridFS subsystem if no file was uploaded', function() {
		
	});
	
	it('passes uploaded file to GridFS', function() {
		
	});
	
	describe('validateGame', function() {	
		it('succeeds if it finds the game in the DB', function(done) {
			resourceUploader.validateGame();
			assert.ok(true);
		});
		it('fails if it does not find the game in the DB', function() {
			assert.ok(true);
		});
	});
	
	describe('validateRequest', function(){
		it('fails if any of the fields is not present in the request',function(){
			console.log(request);
			assert.ok(!resourceUploader.validateRequest(request));
		});
		
		it('succeeds if all fields are non-null',function() {
			request.body.gameid = tempGameID;
			assert.ok(resourceUploader.validateRequest(request));
		});		
	});
	
});