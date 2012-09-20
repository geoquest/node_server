var assert = require("assert");

var ResourceList = require("../../../ServerComponents/pages/games/ResourceList");
var Resource = require("../../../ServerComponents/Resource");
var Game = require("../../../ServerComponents/Game");
var Request = require("../../../ServerComponents/util/test/Request");
var Response = require("../../../ServerComponents/util/test/Response");

describe('ResourceList', function() {
	
	var page = null;
	
	var request = null;
	
	var response = null;
	
	var resourceRepo = null;
	
	var gameRepo = null;
	
	beforeEach(function() {
		
		request = new Request.class();
		request.query.id = "";
		
		response = new Response.class();

		page = new ResourceList.class();
		
		resourceRepo = {
			findAllByGame: function(game,callback){
				callback([]);
			}
		};
		page.setResourceRepository(resourceRepo);
		
		gameRepo = {
			findGameById: function(gameId,callback){
				var game = new Game.class();
				game.setId(gameId);
				callback(game);
			}
		};
		page.setGameRepository(gameRepo);
		
	});
	
	afterEach(function() {
		request = null;
		response = null;
	});
	
	
	it('should call findAllByGame in ResourceRepository', function(done){
        resourceRepo.findAllByGame = function(game, callback){
        	callback([]);
        	done();
        };
        	
		page.handleRequest(request,response);
		
	});
	
	it('should call findGameById in GameRepository', function(done){
        gameRepo.findGameById = function(game, callback){
        	callback(null);
        	done();
        };
		page.handleRequest(request,response);
	});
	
	
	it('should return status code 500 if game not found', function(){
		gameRepo.findGameById = function(gameId, callback){
			callback(null);
		};
		page.handleRequest(request,response);
		assert.equal(response.statusCode, 500);
	});
	
	it('should return valid JSON', function(){
		page.handleRequest(request,response);
		assert.notThrows(function() {
			JSON.parse(response.body);
		});
	});
	
	it('should return correct number of resources', function() {
		resourceRepo.findAllByGame = function(game, callback) {
			var resources = [];
			for (var i = 0; i < 2; i++) {
				var resource = new Resource.class();
				resource.setId('resource-' + i);
				resources.push(resource);
			}
			callback(resources);
		};
		page.handleRequest(request,response);
		var json = JSON.parse(response.body);
		assert.equal(json.length, 2);
	});
	
	it('should return resource ids', function() {
		resourceRepo.findAllByGame = function(game, callback) {
			var resources = [];
			for (var i = 0; i < 2; i++) {
				var resource = new Resource.class();
				resource.setId('resource-' + i);
				resources.push(resource);
			}
			callback(resources);
		};
		page.handleRequest(request,response);
		assert.notEqual(response.body.indexOf('resource-1'), -1);
		assert.notEqual(response.body.indexOf('resource-2'), -1);
	});
	

});